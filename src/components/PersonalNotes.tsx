import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  BookOpen,
  Calendar
} from 'lucide-react';
import { StorageUtils } from '../utils/storage';

interface Note {
  id: string;
  title: string;
  content: string;
  articleId: string;
  lastUpdated: string;
}

interface PersonalNotesProps {
  onClose?: () => void;
}

export function PersonalNotes({ onClose }: PersonalNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    articleId: ''
  });

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = StorageUtils.getNotes();
    const notesArray = Object.entries(savedNotes).map(([articleId, noteData]) => ({
      id: articleId,
      title: noteData.title || `Note for Article ${articleId}`,
      content: noteData.content,
      articleId,
      lastUpdated: noteData.lastUpdated
    }));
    setNotes(notesArray);
  }, []);

  const handleSaveNote = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    const noteId = formData.articleId || `note-${Date.now()}`;
    const noteData = {
      title: formData.title,
      content: formData.content,
      lastUpdated: new Date().toISOString()
    };

    StorageUtils.saveNote(noteId, noteData);
    
    // Update local state
    const newNote: Note = {
      id: noteId,
      title: formData.title,
      content: formData.content,
      articleId: noteId,
      lastUpdated: noteData.lastUpdated
    };

    if (editingNote) {
      setNotes(notes.map(note => note.id === editingNote.id ? newNote : note));
    } else {
      setNotes([...notes, newNote]);
    }

    // Reset form
    setFormData({ title: '', content: '', articleId: '' });
    setEditingNote(null);
    setShowAddForm(false);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      articleId: note.articleId
    });
    setShowAddForm(true);
  };

  const handleDeleteNote = (noteId: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      StorageUtils.deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    }
  };

  const handleCancel = () => {
    setFormData({ title: '', content: '', articleId: '' });
    setEditingNote(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-navy-blue">Personal Notes</h2>
          <p className="text-gray-600">Keep track of your thoughts and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-navy-blue hover:bg-navy-blue/90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Note
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>
              {editingNote ? 'Edit Note' : 'Add New Note'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter note title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="articleId">Article/Section ID (Optional)</Label>
              <Input
                id="articleId"
                value={formData.articleId}
                onChange={(e) => setFormData({ ...formData, articleId: e.target.value })}
                placeholder="e.g., article-14, fundamental-rights"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your notes here..."
                rows={6}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleSaveNote} className="bg-navy-blue hover:bg-navy-blue/90 text-white">
                <Save className="w-4 h-4 mr-2" />
                {editingNote ? 'Update Note' : 'Save Note'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes List */}
      {notes.length === 0 ? (
        <Card className="border-0 shadow-md">
          <CardContent className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No notes yet</h3>
            <p className="text-gray-500 mb-4">Start adding your personal notes and insights</p>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-navy-blue hover:bg-navy-blue/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Note
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <Card key={note.id} className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{note.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(note.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditNote(note)}
                      className="p-1 h-auto"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      className="p-1 h-auto text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                {note.articleId && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {note.articleId}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

