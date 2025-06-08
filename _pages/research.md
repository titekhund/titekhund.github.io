---
layout: page
title: "Research"
permalink: /research/
---
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather:700&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:400,600&display=swap">
<style>
body, .page, .page-content, .main, .right-panel {
  background: #fdf6e3 !important;
  color: #657b83 !important;
  font-family: 'Inter', Arial, sans-serif;
}
.research-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 32px 0;
}
@media (max-width: 1024px) {
  .research-grid {
    grid-template-columns: 1fr;
  }
}
.research-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(38,139,210,0.08);
  padding: 20px;
  margin-bottom: 20px;
  transition: box-shadow 0.2s, transform 0.2s;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.research-card:hover {
  box-shadow: 0 6px 24px rgba(38,139,210,0.18);
  transform: scale(1.02);
}
.research-title {
  font-family: 'Merriweather', serif;
  color: #073642;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;
}
.research-title a {
  color: #073642;
  text-decoration: none;
}
.research-title a:hover {
  color: #b58900;
  text-decoration: underline;
}
.research-meta {
  font-size: 14px;
  color: #657b83;
  font-style: italic;
  margin-bottom: 10px;
}
.research-summary {
  font-size: 16px;
  color: #657b83;
  margin-bottom: 16px;
  font-family: 'Inter', Arial, sans-serif;
}
.research-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.research-tag {
  background: #268bd2;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 14px;
  font-size: 14px;
  font-family: 'Inter', Arial, sans-serif;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  font-weight: 600;
  margin-top: 2px;
}
.research-tag:hover {
  background: #fff;
  color: #b58900;
  border: 1px solid #b58900;
}
@media (max-width: 600px) {
  .research-card {
    padding: 14px;
  }
  .research-title {
    font-size: 1.1rem;
  }
  .research-summary {
    font-size: 15px;
  }
  .research-tags {
    gap: 6px;
  }
}
</style>

<div class="research-grid">
  <!-- Example Card 1 -->
  <div class="research-card">
    <div class="research-title"><a href="https://ssrn.com/abstract=123456" target="_blank">Deep Learning for Macroeconomic Forecasting</a></div>
    <div class="research-meta">Tato Khundadze, Jane Doe • 2024 • SSRN</div>
    <div class="research-summary">We propose a novel deep learning framework for forecasting macroeconomic variables, demonstrating significant improvements over traditional models. Our approach leverages large-scale datasets and interpretable neural architectures.</div>
    <div class="research-tags">
      <a class="research-tag" href="https://ssrn.com/abstract=123456" target="_blank">SSRN</a>
      <a class="research-tag" href="https://ft.com/article/123" target="_blank">FT</a>
    </div>
  </div>
  <!-- Example Card 2 -->
  <div class="research-card">
    <div class="research-title"><a href="https://fes.de/article/456" target="_blank">Policy Uncertainty and Economic Dynamics</a></div>
    <div class="research-meta">Tato Khundadze • 2023 • FES</div>
    <div class="research-summary">This paper analyzes the impact of policy uncertainty on economic growth using a dynamic stochastic model. Results highlight the importance of robust policy design in volatile environments.</div>
    <div class="research-tags">
      <a class="research-tag" href="https://fes.de/article/456" target="_blank">FES</a>
    </div>
  </div>
  <!-- Example Card 3 -->
  <div class="research-card">
    <div class="research-title"><a href="https://oxfordglobal.com/article/789" target="_blank">Machine Learning in Global Markets</a></div>
    <div class="research-meta">Tato Khundadze, Alex Smith • 2022 • Oxford Global</div>
    <div class="research-summary">We review the application of machine learning techniques in global financial markets, focusing on risk management and predictive analytics.</div>
    <div class="research-tags">
      <a class="research-tag" href="https://oxfordglobal.com/article/789" target="_blank">Oxford Global</a>
      <a class="research-tag" href="https://ips.org/article/101" target="_blank">IPS</a>
    </div>
  </div>
  <!-- Example Card 4 (no summary) -->
  <div class="research-card">
    <div class="research-title"><a href="https://ssrn.com/abstract=999999" target="_blank">Analytical Article Example</a></div>
    <div class="research-meta">Tato Khundadze • 2021 • SSRN</div>
    <div class="research-summary">This article explores analytical methods in economic research. <!-- If summary missing, truncate or show placeholder. --></div>
    <div class="research-tags">
      <a class="research-tag" href="https://ssrn.com/abstract=999999" target="_blank">SSRN</a>
    </div>
  </div>
</div>
