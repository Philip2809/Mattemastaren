// startsida
import './HomePage.css';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1 className="hero-title">Välkommen till Mattemästaren!</h1>
        <p className="hero-description">
          Träna matematik på ett roligt och enkelt sätt. Välj mellan olika typer av uppgifter 
          och följ din utveckling med vårt poängsystem.
        </p>
        
        <button 
          className="start-button"
          onClick={() => onNavigate('exercises')}
        >
          Börja träna nu
        </button>
      </div>
      
      <div className="features-section">
        <h2>Vad kan du träna på?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>Addition & Subtraktion</h3>
            <p>Träna grundläggande räkning med plus och minus</p>
          </div>
          
          <div className="feature-card">
            <h3>Multiplikation & Division</h3>
            <p>Lär dig gångertabellen och division</p>
          </div>
          
          <div className="feature-card">
            <h3>Blandade uppgifter</h3>
            <p>Kombinera olika räknesätt</p>
          </div>
          
          <div className="feature-card">
            <h3>Jämförelse & Sortering</h3>
            <p>Träna på att jämföra och ordna tal</p>
          </div>
        </div>
      </div>
      
      <div className="info-section">
        <h2>Hur fungerar det?</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <p>Välj typ av uppgift</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <p>Lös matematikuppgiften</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <p>Få poäng och feedback</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
