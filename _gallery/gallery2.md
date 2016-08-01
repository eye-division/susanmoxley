---
title:  "Poet in Exile"
image_path: "/assets/images/poet_in_exile_benedetti_th.jpg"
description: ""
gallery_date: 2016-05-01
permalink: /gallery/poet-in-exile/
---

This series features poets who have been exiles and a poem which expresses issues of being exiled – even though it may have been written later, when the poet was able to return home. Edward Said, the Palestinian philosopher and historian, said: ‘We are all exiles now’ and I want to capture universal emotions of longing, discontinuity, being a stranger. Ideally, I want to be able to understand the poem in the original language, so that also forms part of my selection criteria.

<div class="gallery">
  {% for image in site.photos %}
    {% if image.gallery == "Poet in Exile" %}
    <div class="gallery-box{% cycle '', ' last' %}">
        <a href="{{ image.image_path }}.jpg" class="galleryphoto" data-lightbox="poets" data-title="{{ image.caption }}"><img src="{{ image.image_path }}_th.jpg" alt="{{ image.title}}"/></a>
        <figcaption>
            <a href="{{ image.image_path }}.jpg" data-lightbox="poets" data-title="{{ image.title}}">{{ image.title}}</a>
            {% if image.poem %}
            <a href="{{ image.poemlink }}"> - {{ image.poem }}</a>
            {% endif %}
        </figcaption>
    </div>
    {% endif %}
  {% endfor %}
</div>

Forthcoming Poets in Exile:  Ida Vitale (Uruguay), Habib Tengour (France/Algeria)

Please do tell me about any poet and poem you think would fit my criteria and I will investigate!
