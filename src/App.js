
import './App.css';

function App() {

    return (
      <div>
        <header>
          <h1>Verkkokauppa</h1>
          <nav>
            <ul>
              <li><a href="/">Etusivu</a></li>
              <li><a href="/vaatteet">Vaatteet</a></li>
              <li><a href="/kengät">Kengät</a></li>
              <li><a href="/laukut">Laukut</a></li>
              <li><a href="/asusteet">Asusteet</a></li>
              <li><a href="/yhteystiedot">Yhteystiedot</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <section>
            <h2>Suosituimmat tuotteet</h2>
            <div className="tuotteet"></div>
          </section>
        </main>
        <main>
          <section>
            <h2>Alennukset</h2>
            <div className="tuotteet"></div>
          </section>
        </main>
        <footer>
          <p>&copy; 2023 SG7-Verkkokauppa</p>
        </footer>
      </div>
    );
  }


export default App;
