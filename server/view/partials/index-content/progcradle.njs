{% if lang === "ja" %}
  {% set fig1_alt = "Runescapeで「Varrock」という都市の画像。" %}
  {% set fig1_caption = "Runescapeのなかで主要都市である「Varrock」（クリックで広がります）。" %}
  {% set fig2_alt = "Runescapeで「Prifddinas」という都市の画像。" %}
  {% set fig2_caption = "また他の主要都市である「Prifddinas」（クリックで広がります）" %}
  {% set fig3_alt = "昔に書いたPascalプログラムの一部の画像。" %}
  {% set fig3_caption = "昔に書いたPascalプログラムの一部です。　いい見覚えのために全てを保存しています。" %}
{% else %}
  {% set fig1_alt = "Image showing Varrock, a city of Runescape." %}
  {% set fig1_caption = "Varrock, one of the main cities of Runescape (click to expand)." %}
  {% set fig2_alt = "Image showing Prifddinas, a city of Runescape." %}
  {% set fig2_caption = "Another main city, Prifddinas (click to expand)." %}
  {% set fig3_alt = "Image showing a snippet of Pascal code I wrote." %}
  {% set fig3_caption = "Snippet of Pascal code of a bot I once made. I keep all of them for good remembrance." %}
{% endif %}

<div class="text-left container" style="font-size: 1.1rem;">
  <p>
    {{ trans.home.progcradle.par1 }}
  </p>
  <div class="row">
    <div class="col-sm-6 text-center">
      <figure class="figure">
        <a href="/images/index/progcradle/varrock_palace.png" target="_blank">
          <img src="/images/index/progcradle/varrock_palace_small.png" class="figure-img img-fluid rounded" alt="{{ fig1_alt }}">
        </a>
        <figcaption class="figure-caption">{{ fig1_caption }}</figcaption>
      </figure>
    </div>
    <div class="col-sm-6 text-center">
        <figure class="figure">
          <a href="/images/index/progcradle/prifddinas_ithell.png" target="_blank">
            <img src="/images/index/progcradle/prifddinas_ithell_small.png" class="figure-img img-fluid rounded" alt="{{ fig2_alt }}">
          </a>
          <figcaption class="figure-caption">{{ fig2_caption }}</figcaption>
        </figure>
      </div>
  </div>

  {{ trans.home.progcradle.par2 }}

  <div class="text-center">
    <figure class="figure">
      <img src="/images/index/progcradle/simba_pascal_snippet.png" class="figure-img img-fluid rounded" alt="{{ fig3_alt }}">
      <figcaption class="figure-caption">{{ fig3_caption }}</figcaption>
    </figure>
  </div>

  {{ trans.home.progcradle.par3 }}
</div>