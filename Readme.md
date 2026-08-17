# Smart Tourist Safety Monitoring & Incident Response System

**SIH25002**

A web-based tourist safety and emergency-response platform designed to improve the **safety, tracking, identification, and emergency response** of tourists, particularly in remote regions of North-East India.

---

## 📌 Overview

The **Smart Tourist Safety Monitoring & Incident Response System** is an end-to-end platform that combines:

- Digital Tourist Identity
- GPS-based location tracking
- Interactive safety maps
- Geo-fencing
- AI-based risk detection
- Offline-first capabilities
- SOS emergency response
- Authority monitoring dashboard
- Secure data management
- Blockchain-based credential verification
- Multilingual support

The system is designed not only to track tourists, but also to **prevent dangerous situations and enable faster emergency response**.

---

## 🎯 Objectives

The primary objectives of the project are:

1. Provide every registered tourist with a secure **Digital Tourist ID**.
2. Enable real-time tourist location monitoring through GPS.
3. Identify safe, warning, restricted, and high-risk zones.
4. Automatically detect when tourists enter or leave hazardous areas.
5. Generate risk levels using location, route deviation, unusual movement, time spent in risky zones, and incident information.
6. Provide an emergency **SOS mechanism**.
7. Allow authorized authorities to monitor tourists and respond to incidents.
8. Support essential safety features even when internet connectivity is unavailable.
9. Synchronize locally stored data when connectivity is restored.
10. Provide secure identity and data management.

---

## ✨ Key Features

### 👤 Digital Tourist ID

Every registered tourist receives a unique Digital Tourist ID containing:

- Unique Tourist ID
- QR Code
- Contact information
- Blood group and Medical History
- Emergency contact
- Blockchain ID/credential reference

The QR code can be used for quick identity verification during emergencies.

---

### 📍 Live Location Tracking

The tourist interface provides a map displaying the tourist's current location.

The system is designed to support:

- GPS-based positioning
- Location sharing
- Continuous location monitoring
- Safety-zone detection

---

### 🗺️ Offline Safety Map

The platform displays different safety zones on an interactive map:

- 🟢 Safe Zone
- 🟡 Warning Zone
- 🔴 High-Risk / Restricted Zone

The map can be used by both tourists and authorized authorities to understand the current safety situation.

---

### 🚧 Geo-Fencing

Predefined geographical boundaries can be created for:

- Dangerous areas
- Restricted areas
- Wildlife zones
- Flood-prone regions
- Other sensitive areas

When a tourist enters or leaves a predefined hazardous zone, the system can generate a warning.

---

### 🤖 AI-Based Risk Detection

The planned AI module analyzes factors such as:

- Tourist location
- Route deviation
- Unusual movement
- Time spent in risky zones
- Incident information

Based on these factors, the system generates a risk score and classifies the situation into:

```text
SAFE
WARNING
HIGH RISK
CRITICAL
```

<div align="center">

                    TOURIST
                      │
                      ▼
              ┌─────────────────┐
              │  Web / Mobile   │
              │    Interface    │
              └────────┬────────┘
                       │
                 HTTP / REST API
                       │
                       ▼
              ┌─────────────────┐
              │    BACKEND      │
              │ Node.js/FastAPI │
              └────────┬────────┘
                       │
          ┌────────────┼─────────────┐
          │            │             │
          ▼            ▼             ▼
     PostgreSQL      AI/ML       Geo-Fencing
                     Module        Module
          │            │             │
          └────────────┼─────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │    AUTHORITY    │
              │    DASHBOARD    │
              └─────────────────┘ 
</div>