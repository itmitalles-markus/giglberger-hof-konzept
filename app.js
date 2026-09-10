(() => {
  const root = document.documentElement;
  const menuButton = document.querySelector('.menu-button');
  const nav = document.querySelector('.main-nav');
  const form = document.querySelector('#fence-form');

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));

  const controls = {
    type: document.querySelector('#fence-type'),
    material: document.querySelector('#fence-material'),
    length: document.querySelector('#fence-length'),
    height: document.querySelector('#fence-height'),
    spacing: document.querySelector('#fence-spacing'),
    slats: document.querySelector('#fence-slats'),
    gate: document.querySelector('#fence-gate'),
    service: document.querySelector('#fence-service')
  };

  const preview = document.querySelector('#fence-preview');
  const slatsControl = document.querySelector('#slats-control');
  const typeNames = {
    senkrecht: 'Senkrechtzaun',
    stakete: 'Staketenzaun',
    jager: 'Jägerzaun',
    ranch: 'Ranch- / Weidezaun'
  };
  const materialNames = {
    laerche: 'Lärche natur',
    fichte: 'Fichte imprägniert',
    robinie: 'Robinie natur',
    metall: 'Metall anthrazit'
  };
  const materialColors = {
    laerche: '#b98450',
    fichte: '#7f9a63',
    robinie: '#9b754d',
    metall: '#3e4543'
  };
  const decimal = value => Number(value).toLocaleString('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });

  function currentConfiguration() {
    const segments = Math.ceil(Number(controls.length.value) / Number(controls.spacing.value));
    const slats = controls.type.value === 'ranch' ? 0 : segments * Number(controls.slats.value);
    return { segments, slats, posts: segments + 1 };
  }

  function updatePreview() {
    const values = currentConfiguration();
    const previewSlats = controls.type.value === 'ranch'
      ? 0
      : Math.min(24, Math.max(7, Number(controls.slats.value) + 4));

    preview.querySelectorAll('.slat').forEach(node => node.remove());
    for (let index = 0; index < previewSlats; index += 1) {
      const slat = document.createElement('span');
      slat.className = 'slat';
      if (controls.type.value === 'stakete') {
        slat.style.setProperty('--slat-height', `${68 + (index % 4) * 5}%`);
      }
      preview.insertBefore(slat, preview.firstChild);
    }

    preview.className = `fence type-${controls.type.value}`;
    preview.style.setProperty('--fence-color', materialColors[controls.material.value]);
    preview.style.height = `${35 + ((Number(controls.height.value) - 60) / 140) * 42}%`;
    slatsControl.hidden = controls.type.value === 'ranch';

    document.querySelector('#length-output').textContent = `${decimal(controls.length.value)} m`;
    document.querySelector('#height-output').textContent = `${controls.height.value} cm`;
    document.querySelector('#spacing-output').textContent = `${decimal(controls.spacing.value)} m`;
    document.querySelector('#slats-output').textContent = controls.slats.value;
    document.querySelector('#summary-type').textContent = typeNames[controls.type.value];
    document.querySelector('#summary-material').textContent = materialNames[controls.material.value];
    document.querySelector('#summary-segments').textContent = `${values.segments} Stück`;
    document.querySelector('#summary-parts').textContent = controls.type.value === 'ranch'
      ? `${values.posts} / 2 Riegel je Feld`
      : `${values.posts} / ${values.slats}`;
  }

  function requestText() {
    const values = currentConfiguration();
    return [
      'Unverbindliche Zaunanfrage',
      '',
      `Zaunart: ${typeNames[controls.type.value]}`,
      `Material: ${materialNames[controls.material.value]}`,
      `Gesamtlänge: ca. ${decimal(controls.length.value)} m`,
      `Höhe: ca. ${controls.height.value} cm`,
      `Segmentbreite: ca. ${decimal(controls.spacing.value)} m`,
      `Segmente: ca. ${values.segments}`,
      controls.type.value === 'ranch'
        ? 'Ausführung: 2 Riegel je Feld'
        : `Latten: ${controls.slats.value} je Segment / ca. ${values.slats} gesamt`,
      `Pfosten: ca. ${values.posts}`,
      `Tor: ${controls.gate.value}`,
      `Gewünschte Leistung: ${controls.service.value}`,
      '',
      'Die endgültigen Maße und Mengen werden nach Prüfung des Grundstücks festgelegt.'
    ].join('\n');
  }

  form.addEventListener('input', updatePreview);
  document.querySelector('#prepare-request').addEventListener('click', () => {
    const result = document.querySelector('#request-result');
    document.querySelector('#request-text').textContent = requestText();
    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  document.querySelector('#copy-request').addEventListener('click', async event => {
    try {
      await navigator.clipboard.writeText(requestText());
      event.currentTarget.textContent = 'Kopiert ✓';
      window.setTimeout(() => { event.currentTarget.textContent = 'Angaben kopieren'; }, 1800);
    } catch {
      document.querySelector('#request-text').focus();
    }
  });

  updatePreview();
  root.classList.add('js-ready');
})();
