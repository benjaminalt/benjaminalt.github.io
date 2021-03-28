---
layout: page
titles:
  en: Publications
key: page-publications
years: [2020]
---

<h3  class="pubyear">Preprint</h3>
{% bibliography -f preprint %}

{% for y in page.years %}
  <h3  id="{{y}}" class="pubyear">{{y}}</h3>
  {% bibliography -q @*[year={{y}}]* %}
{% endfor %}