# 👁️‍🗨️ Project Drishti – AI-Powered Public Event Safety Platform

**Drishti** is a multi-agent AI system designed to improve safety at large public events. Powered by **Google Cloud**, **Vertex AI**, and the **Agent Development Kit (ADK)**, Drishti integrates real-time video analytics, forecasting, LLM summarization, and automated dispatch to shift crowd management from reactive to **proactive**.

> 🏆 Finalist at Agentic AI Day  
> 🧠 Built with Vertex AI, Gemini, Google Maps, ADK  
> 🌍 Designed for events like **Maha Kumbh 2025** to prevent stampedes and chaos in real-time

---

## 📌 Problem Statement

**Theme**: Improving Safety at Large Public Events  
**Category**: Software Solution  
**Team Name**: Atoms  
**Team Leader**: Mohammad Ehshan  

Large events often lack coordinated, real-time tools for predicting and mitigating crowd-related disasters. Project Drishti uses an intelligent multi-agent approach to solve this.

---

## 💡 What is Drishti?

A fully integrated **agentic platform** that:

- **Analyzes live video** for crowd size, flow, and anomalies  
- **Forecasts surges** to prevent stampedes or bottlenecks  
- **Summarizes insights** using a Gemini-powered LLM  
- **Automates dispatch** using Maps APIs for faster incident response  
- **Provides real-time AR/VR navigation and Voice AI communication**

---

## 🧠 System Architecture

![Architecture Diagram](https://claude.ai/public/artifacts/d6710b24-5d3c-4d04-8f96-a431b95e7ccc)

---

## 🧩 Core Components

### 🎥 1. CrowdMonitor Agent
- Uses **Vertex AI Vision** to count people per zone from drones/CCTV.
- Detects congestion, falls, and other unsafe behavior.
- Outputs structured time-series data to BigQuery.

### 📈 2. Forecast Agent
- Feeds real-time counts into **Vertex AI Forecasting (AutoML/TiDE)**.
- Predicts crowd surges 10–20 minutes ahead.
- Sends early warnings like: “Zone B may exceed capacity in 15 min.”

### 🧾 3. Gemini LLM Summarizer Agent
- Fuses data from video feeds, social media, incident logs.
- Summarizes into briefings.
- Responds to voice or text queries: “What’s the issue in Zone C?”

### 🛰️ 4. AI Dispatch Agent
- On incident detection, routes first responders using **Google Maps API**.
- Calculates fastest, congestion-free route with turn-by-turn directions.

---

## 🧬 Additional Smart Features

- **Voice Agent**: Gemini-powered bi-directional voice interface for commanders.
- **AR/VR Navigation**: Color-coded safe zone overlays, exit guidance.
- **Social Media Sentiment Agent**: Detects fear/panic from geo-tagged posts using NLP.
- **Heatmap Thermographer**: Detects agitation and crowd panic patterns.
- **Modular Extensions**: Add Lost & Found facial recognition, sentiment analyzers, etc.

---

## 🎯 Unique Selling Points (USP)

✅ End-to-end **multi-agent architecture** (unlike siloed solutions)  
✅ Built entirely on **Google’s Agent Development Kit (ADK)**  
✅ Combines **real-time analytics + forecasting + dispatch + LLM summaries**  
✅ Enables **anticipatory intervention**, not just reactive action  
✅ Modular, **scalable**, and **customizable**

---

## 🌐 Technologies Used

| Category         | Tools / Services                                |
|------------------|--------------------------------------------------|
| AI & ML          | Vertex AI Vision, Vertex AI Forecast, Gemini LLM |
| Agent Framework  | Vertex AI Agent Builder / Google ADK             |
| Backend Infra    | Google Cloud Run, Node.js, Python, Firebase      |
| Data Storage     | BigQuery, Firestore, Pub/Sub                     |
| Maps & Routing   | Google Maps Places API, Routes API               |
| Frontend         | Next.js, Firebase Hosting, WebXR (AR/VR)         |
| Authentication   | Firebase Auth                                    |

---

## 🧪 Demo & Media

🎥 [Demo Video (Google Drive)](https://drive.google.com/file/d/15Wq1S3MCKRCN6WZuiKa7jbOm_edKmDqW/view?usp=sharing)  
🔗 [Live Architecture Diagram](https://claude.ai/public/artifacts/d6710b24-5d3c-4d04-8f96-a431b95e7ccc)  
📦 [Source Code on GitHub](https://github.com/Mohammad-Ehshan/Drishti)

---

## 🛠️ Setup Instructions (Coming Soon)

A detailed setup guide will be added soon for replicating the ADK pipeline, training the AI models, and deploying the platform on Google Cloud.


---

## 📄 License

MIT License – Open to contributions, use, and innovation with credits.

---

> **Drishti means "vision" — and our AI vision is to make every large gathering safer, smarter, and more manageable.**
