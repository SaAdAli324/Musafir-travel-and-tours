"use client";

import { useState, useEffect } from "react";
import styles from "./Admin.module.css";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [packages, setPackages] = useState([]);
  const [activePackage, setActivePackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    fetchPackages(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        fetchPackages();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Incorrect password");
      }
    } catch (err) {
      setLoginError("Failed to connect to server");
    }
  };

  const fetchPackages = async (isInitial = false) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/packages");
      
      if (res.status === 401) {
        setIsAuthenticated(false);
        if (isInitial) setCheckingAuth(false);
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      if (Array.isArray(data)) {
        setPackages(data);
        setIsAuthenticated(true);
      } else {
        console.error("API returned error:", data);
        setPackages([]);
        alert("Failed to load packages from database. Please ensure your MongoDB credentials are correct and the server has been restarted.");
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
    if (isInitial) setCheckingAuth(false);
  };

  const handlePackageSelect = (pkg) => {
    // Clone to avoid mutating original state before save
    setActivePackage(JSON.parse(JSON.stringify(pkg)));
  };

  const handlePriceChange = (type, value) => {
    setActivePackage(prev => ({
      ...prev,
      pricing: {
        ...(prev.pricing || {}),
        [type]: parseInt(value) || 0
      }
    }));
  };

  const handleDurationChange = (type, value) => {
    setActivePackage(prev => ({
      ...prev,
      duration: {
        ...(prev.duration || {}),
        [type]: parseInt(value) || 0
      }
    }));
  };

  const handleRoutePlanChange = (index, field, value) => {
    const updatedPlan = [...(activePackage.routePlan || [])];
    updatedPlan[index] = { ...updatedPlan[index], [field]: value };
    setActivePackage(prev => ({ ...prev, routePlan: updatedPlan }));
  };

  const removeRouteDay = (index) => {
    const updatedPlan = [...(activePackage.routePlan || [])];
    updatedPlan.splice(index, 1);
    // Re-adjust day numbers
    updatedPlan.forEach((day, i) => { day.day = i + 1; });
    setActivePackage(prev => ({ ...prev, routePlan: updatedPlan }));
  };

  const addRouteDay = () => {
    const updatedPlan = [...(activePackage.routePlan || [])];
    updatedPlan.push({
      day: updatedPlan.length + 1,
      title: "New Day",
      description: ""
    });
    setActivePackage(prev => ({ ...prev, routePlan: updatedPlan }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/packages/${activePackage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pricing: activePackage.pricing,
          routePlan: activePackage.routePlan,
          duration: activePackage.duration
        })
      });
      if (res.ok) {
        alert("Package updated successfully!");
        fetchPackages(); // Refresh list
      } else {
        alert("Failed to update package");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
    setSaving(false);
  };

  if (checkingAuth) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>Verifying Secure Session...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.loginOverlay}>
        <div className={styles.loginCard}>
          <h2>Admin Portal</h2>
          <p className={styles.loginSubtitle}>Sign in to manage packages & pricing</p>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Secure Admin Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {loginError && <p className={styles.errorText}>{loginError}</p>}
            <button type="submit">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Sidebar List */}
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Tour Packages</h3>
        <div className={styles.packageList}>
          {loading ? (
            <div style={{ padding: "1rem", textAlign: "center" }}>Loading...</div>
          ) : packages.length === 0 ? (
            <div style={{ padding: "1rem", textAlign: "center", color: "#ef4444" }}>No packages found or failed to load.</div>
          ) : (
            (packages || []).map(pkg => (
              <div 
                key={pkg.id} 
                className={`${styles.packageItem} ${activePackage?.id === pkg.id ? styles.packageItemActive : ''}`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <h4 className={styles.itemTitle}>{pkg.title}</h4>
                <p className={styles.itemMeta}>{pkg.type} • {pkg.duration?.days} Days</p>
              </div>
            ))
          )}
        </div>
      </aside>

      {/* Editor Panel */}
      <div className={styles.editorPanel}>
        {!activePackage ? (
          <div className={styles.emptyState}>
            Select a package from the sidebar to edit its pricing and route plan.
          </div>
        ) : (
          <div>
            <div className={styles.editorHeader}>
              <div>
                <h2 className={styles.editorTitle}>{activePackage.title}</h2>
                <p className={styles.editorTagline}>{activePackage.id}</p>
              </div>
            </div>

            {/* Duration Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>⏱️ Duration</h3>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>Days</label>
                  <input 
                    type="number" 
                    value={activePackage.duration?.days || 0} 
                    onChange={(e) => handleDurationChange('days', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Nights</label>
                  <input 
                    type="number" 
                    value={activePackage.duration?.nights || 0} 
                    onChange={(e) => handleDurationChange('nights', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>💰 Package Pricing (PKR)</h3>
              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label>Solo / Per Person Rate</label>
                  <input 
                    type="number" 
                    value={activePackage.pricing?.solo || 0} 
                    onChange={(e) => handlePriceChange('solo', e.target.value)}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Couple Rate</label>
                  <input 
                    type="number" 
                    value={activePackage.pricing?.couple || 0} 
                    onChange={(e) => handlePriceChange('couple', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Route Plan Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>🗺️ Route Plan (Itinerary)</h3>
              
              {(activePackage.routePlan || []).map((day, index) => (
                <div key={index} className={styles.routeDayCard}>
                  <div className={styles.dayHeader}>
                    <h4 className={styles.dayTitle}>Day {day.day}</h4>
                    <button 
                      className={styles.deleteBtn}
                      onClick={() => removeRouteDay(index)}
                    >
                      Remove Day
                    </button>
                  </div>
                  
                  <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
                    <label>Title</label>
                    <input 
                      type="text" 
                      value={day.title} 
                      onChange={(e) => handleRoutePlanChange(index, 'title', e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea 
                      rows={3}
                      value={day.description} 
                      onChange={(e) => handleRoutePlanChange(index, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              
              <button className={styles.addDayBtn} onClick={addRouteDay}>
                + Add Another Day to Itinerary
              </button>
            </div>
            
            {/* Action Footer */}
            <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className={styles.saveBtn} 
                onClick={handleSave}
                disabled={saving}
                style={{ fontSize: '1.1rem', padding: '0.8rem 2.5rem' }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
