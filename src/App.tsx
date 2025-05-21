// App.tsx
import Navbar from './components/Navbar';
import Header from './components/Header';
import Card from './components/Card';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}> {/* Set background color to white */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000 }}>
        <Navbar />
      </div>
      <div style={{ position: 'fixed', top: '55px', left: 0, width: '100%', zIndex: 1000 }}>
        <Header />
      </div>
      <div style={{ paddingTop: "20px" }}>
        <Card />
      </div>
<div>
  <Footer/>
</div>
      
    </div>
  );
}

export default App;
