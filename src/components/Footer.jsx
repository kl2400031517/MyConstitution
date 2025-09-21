const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About</h3>
          <ul>
            <li><a href="#about">Our Mission</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="#constitution">Constitution of India</a></li>
            <li><a href="#rights">Fundamental Rights</a></li>
            <li><a href="#duties">Fundamental Duties</a></li>
            <li><a href="#directive">Directive Principles</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Learning</h3>
          <ul>
            <li><a href="#quiz">Constitution Quiz</a></li>
            <li><a href="#timeline">Historical Timeline</a></li>
            <li><a href="#glossary">Legal Glossary</a></li>
            <li><a href="#faq">FAQs</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Connect</h3>
          <ul>
            <li><a href="#discussion">Discussion Board</a></li>
            <li><a href="#legal-help">Legal Help</a></li>
            <li><a href="#newsletter">Newsletter</a></li>
            <li><a href="#social">Social Media</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Know Your Constitution. All rights reserved. | Made with ❤️ for India</p>
      </div>
    </footer>
  );
};

export default Footer;


