import React from 'react'

function AboutUs() {
  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.title}>Redefining Real Estate with <span style={{color: '#1d3f94'}}>PropBot</span></h1>
        <p style={styles.subtitle}>
          We bridge the gap between dream homes and reality through verified listings and seamless technology.
        </p>
      </section>

      {/* Mission Section */}
      <section style={styles.gridSection}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Our Mission</h2>
          <p style={styles.cardText}>
            To empower every individual to discover, buy, or rent verified properties with total confidence and ease.
          </p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Why Choose Us?</h2>
          <ul style={styles.list}>
            <li>✔ 100% Verified Properties</li>
            <li>✔ Transparent Pricing</li>
            <li>✔ One-Click Booking</li>
          </ul>
        </div>
      </section>

      {/* Stats Section */}
      <section style={styles.statsContainer}>
        <div style={styles.statBox}><strong>10k+</strong><br/>Happy Clients</div>
        <div style={styles.statBox}><strong>5k+</strong><br/>Verified Listings</div>
        <div style={styles.statBox}><strong>24/7</strong><br/>Support</div>
      </section>
    </div>
  )
}

const styles = {
  container: {
    padding: '40px 20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#333',
  },
  hero: {
    textAlign: 'center',
    padding: '60px 0',
    backgroundColor: '#f8f9fa',
    borderRadius: '24px', // Matching your screenshot curves
    marginBottom: '40px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '700px',
    margin: '0 auto',
  },
  gridSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    marginBottom: '60px',
  },
  card: {
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
  },
  cardTitle: {
    color: '#1d3f94', // Using the dark blue from your "Find Property" button
    marginBottom: '15px',
  },
  cardText: {
    lineHeight: '1.6',
    color: '#555',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    lineHeight: '2',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '40px',
    backgroundColor: '#1d3f94',
    borderRadius: '24px',
    color: 'white',
    textAlign: 'center',
  },
  statBox: {
    fontSize: '1.1rem',
  }
}

export default AboutUs