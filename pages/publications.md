---
layout: page
titles:
  en: Publications
key: page-publications
conf_years: [2020, 2021, 2022, 2023]
book_years: [2020, 2022]
patent_years: [2022]
---

<!-- <h3  class="pubyear">Preprint</h3>
{% bibliography -f preprint %} -->

<h2>Conference papers</h2>
{% for y in page.conf_years reversed %}
  <h3  id="{{y}}" class="pubyear">{{y}}</h3>
  {% bibliography -q @inproceedings[year={{y}}]* %}
{% endfor %}

<h2>Book chapters</h2>
{% for y in page.book_years reversed %}
  <h3  id="{{y}}" class="pubyear">{{y}}</h3>
  {% bibliography -q @incollection[year={{y}}]* %}
{% endfor %}

<h2>Patents</h2>
{% for y in page.patent_years reversed %}
  <h3  id="{{y}}" class="pubyear">{{y}}</h3>
  {% bibliography -q @patent[year={{y}}]* %}
{% endfor %}