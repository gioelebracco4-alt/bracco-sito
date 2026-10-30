// BraccoBrand — catalogo prodotti.
// Per aggiungere o modificare un prodotto basta cambiare questo file: la griglia,
// la scheda di dettaglio, la ricerca e il menu si aggiornano da soli.
// Dati ripresi dal vecchio sito e dalle schede La Nordica-Extraflame / Dielle.
window.BRACCO = {
  whatsapp: '393779620456',
  phone: '0921 641957',
  phoneHref: '+390921641957',
  mobile: '377 9620456',
  email: 'ceramichebracco@gmail.com',
  city: 'Petralia Soprana',
  maps: 'https://www.google.com/maps/search/?api=1&query=Ceramiche+Bracco+Petralia+Soprana',

  // Filtri della griglia stufe
  filters: [
    { id: 'tutte', label: 'Tutte' },
    { id: 'pellet', label: 'Pellet' },
    { id: 'combinata', label: 'Legna e pellet' },
    { id: 'legna', label: 'Legna' }
  ],

  products: [
    {
      id: 'borea',
      name: 'Borea Hybrid 10 kW',
      brand: 'Dielle',
      type: 'combinata',
      kind: 'Stufa combinata legna e pellet',
      img: 'assets/img/borea-hybrid.jpg',
      pos: '24% 50%',
      price: 3990,
      tagline: 'Il piacere della legna. La praticità del pellet.',
      text: 'Una stufa combinata per scegliere come vivere il calore di casa, con convezione naturale o ventilazione forzata escludibile.',
      highlights: ['10 kW', 'Legna e pellet', 'Combustione sorgiva'],
      features: [
        'Funzionamento a legna e pellet',
        'Potenza di 10 kW',
        'Combustione sorgiva: pellet alimentato dal basso',
        'Espulsione automatica della cenere dal braciere',
        'Ventilazione forzata escludibile'
      ],
      official: 'https://www.diellespa.it/stufe-a-legna-pellet/borea-hybrid/'
    },
    {
      id: 'margaret',
      name: 'Margaret Petra',
      brand: 'La Nordica-Extraflame',
      line: 'Evolution Line',
      type: 'combinata',
      kind: 'Stufa ermetica combinata pellet e legna',
      img: 'assets/img/margaret-petra.jpg',
      pos: '70% 50%',
      price: 5350,
      listPrice: 6500,
      tagline: 'Legna e pellet, insieme.',
      text: 'Rivestimento in acciaio verniciato e pietra naturale. Il fascino della legna incontra la comodità del pellet.',
      highlights: ['10 kW pellet', 'Braciere autopulente', 'WiFi di serie', '5 stelle'],
      finishes: [{ name: 'Pietra naturale', code: '001289202', list: 6500 }],
      specs: [
        ['Potenza nominale', 'Pellet 3,0–10,0 kW · Legna 6,0–10,1 kW'],
        ['Volume riscaldabile', '287 m³'],
        ['Rendimento', 'Pellet 82–90 % · Legna 88–89 %'],
        ['Rendimento stagionale', '80 %'],
        ['Consumo orario', 'Pellet 0,8–2,3 kg/h · Legna 1,6–2,6 kg/h'],
        ['Assorbimento elettrico', '21–62 W'],
        ['Dimensioni (L × H × P)', '890 × 1157 × 532 mm'],
        ['Peso netto', '270 kg'],
        ['Scarico fumi', '120 mm (posteriore/superiore)'],
        ['Uscita ventilazione', 'Frontale'],
        ['Canalizzazione', '80 mm, 1 uscita optional fino a 8 m'],
        ['Serbatoio pellet', '30 kg'],
        ['Lunghezza legna max', '33 cm']
      ],
      features: [
        'Ventilazione ambiente escludibile',
        'Pulizia automatica del braciere',
        'Accensione a legna anche da remoto',
        'Sensore del livello pellet',
        'Cassetto cenere estraibile',
        'Cronotermostato settimanale'
      ],
      standard: ['Telecomando IR touch', 'Display Black Mask'],
      optional: [['Kit canalizzazione', 182], ['Pedana', 138]],
      incentive: [509.10, 721.23, 933.35, 1187.90, 1442.45, 1527.30],
      official: 'https://www.lanordica-extraflame.com/it/pellet/stufe-combinate/margaret-petra'
    },
    {
      id: 'luisella',
      name: 'Luisella 5.0 Maxi',
      brand: 'La Nordica-Extraflame',
      type: 'pellet',
      kind: 'Stufa a pellet ermetica ventilata, slim',
      img: 'assets/img/luisella-maxi.jpg',
      pos: '22% 50%',
      price: 1450,
      tagline: 'Compatta, nel tuo stile.',
      text: 'Rivestimento in acciaio verniciato, profondità di soli 29 cm e ventilazione escludibile.',
      highlights: ['7 kW', 'Profondità 29 cm', 'WiFi di serie', '5 stelle'],
      finishes: [
        { name: 'Grigio Grafite', code: '001294901', list: 1730 },
        { name: 'Nero', code: '001294902', list: 1730 }
      ],
      specs: [
        ['Potenza nominale', '2,5–7,0 kW'],
        ['Volume riscaldabile', '201 m³'],
        ['Rendimento', '94–92 %'],
        ['Rendimento stagionale', '81 %'],
        ['Consumo orario', '0,6–1,6 kg/h'],
        ['Assorbimento elettrico', '38–66 W'],
        ['Dimensioni (L × H × P)', '639 × 892 × 290 mm'],
        ['Peso netto', '99 kg'],
        ['Scarico fumi', '80 mm (posteriore/laterale dx)'],
        ['Uscita ventilazione', 'Superiore'],
        ['Serbatoio pellet', '10 kg']
      ],
      features: [
        'Stufa ermetica con ventilazione escludibile',
        'WiFi di serie e App Total Control 3.0',
        'Porta fuoco, focolare e braciere in ghisa',
        'Scambiatore di calore a fascio tubiero',
        'Vano cenere',
        'Display LED WiFi e telecomando IR touch'
      ],
      standard: ['Telecomando IR touch', 'Display LED WiFi (App Total Control 3.0)'],
      incentive: [430.24, 609.51, 788.77, 1003.90, 1219.02, 1290.72],
      official: 'https://www.lanordica-extraflame.com/it/pellet/stufe-pellet/luisella-50-maxi'
    },
    {
      id: 'ketty',
      name: 'Ketty 5.0',
      brand: 'La Nordica-Extraflame',
      type: 'pellet',
      kind: 'Stufa a pellet ventilata',
      img: 'assets/img/ketty.jpg',
      pos: '33% 50%',
      price: 1450,
      tagline: 'Il calore di casa.',
      text: 'Rivestimento in acciaio verniciato, in quattro colori.',
      highlights: ['6,5 kW', 'Ventilazione frontale', 'Serbatoio 15 kg', '5 stelle'],
      finishes: [
        { name: 'Bianco', code: '001292200', list: 1650 },
        { name: 'Bordeaux', code: '001292201', list: 1650 },
        { name: 'Nero', code: '001292202', list: 1650 },
        { name: 'Avorio', code: '001292203', list: 1650 }
      ],
      specs: [
        ['Potenza nominale', '2,5–6,5 kW'],
        ['Volume riscaldabile', '186 m³'],
        ['Rendimento', '91–92 %'],
        ['Rendimento stagionale', '80 %'],
        ['Consumo orario', '0,6–1,4 kg/h'],
        ['Assorbimento elettrico', '35–75 W'],
        ['Dimensioni (L × H × P)', '456 × 884 × 479 mm'],
        ['Peso netto', '77 kg'],
        ['Scarico fumi', '80 mm (posteriore)'],
        ['Uscita ventilazione', 'Frontale'],
        ['Serbatoio pellet', '15 kg']
      ],
      features: [
        'Porta fuoco, focolare e braciere in ghisa',
        'Scambiatore di calore a superficie radiante',
        'Vano cenere estraibile',
        'Display Black LCD di serie',
        'Funzioni Easy Setup, Easy Control, Pro Air Setup e FPC+',
        'Telecomando IR e modulo WiFi opzionali'
      ],
      standard: ['Display Black LCD'],
      optional: [['Telecomando IR touch', 43], ['Modulo remoto WiFi', 228]],
      incentive: [413.86, 586.30, 758.74, 965.66, 1172.59, 1241.57],
      official: 'https://www.lanordica-extraflame.com/it/pellet/stufe-pellet/ketty-50'
    },
    {
      id: 'angelica',
      name: 'Angelica Evo',
      brand: 'La Nordica-Extraflame',
      line: 'Prestige Line',
      type: 'pellet',
      kind: 'Stufa a pellet ermetica ventilata',
      img: 'assets/img/angelica-evo.jpg',
      pos: '78% 50%',
      price: 1790,
      tagline: 'Il comfort incontra lo stile.',
      text: 'Rivestimento in acciaio verniciato, WiFi di serie e ventilazione escludibile.',
      highlights: ['8 kW', 'Ventilazione escludibile', 'WiFi di serie', '5 stelle'],
      finishes: [
        { name: 'Avorio', code: '001297000', list: 2340 },
        { name: 'Bordeaux', code: '001297001', list: 2300 },
        { name: 'Nero', code: '001297002', list: 2300 }
      ],
      specs: [
        ['Potenza nominale', '3,0–8,0 kW'],
        ['Volume riscaldabile', '229 m³'],
        ['Rendimento', '94–91 %'],
        ['Rendimento stagionale', '80 %'],
        ['Consumo orario', '0,7–1,8 kg/h'],
        ['Assorbimento elettrico', '31–64 W'],
        ['Dimensioni (L × H × P)', '495 × 1016 × 555 mm'],
        ['Peso netto', '99 kg'],
        ['Scarico fumi', '80 mm (posteriore/superiore)'],
        ['Uscita ventilazione', 'Frontale'],
        ['Serbatoio pellet', '15 kg']
      ],
      features: [
        'Porta fuoco, focolare e braciere in ghisa',
        'Scambiatore di calore a superficie radiante',
        'Vano cenere estraibile',
        'Candeletta ceramica',
        'Display LCD WiFi',
        'Funzioni Easy Setup, Easy Control, Pro Air Setup, FPC+ e App Total Control 3.0'
      ],
      standard: ['Display LCD WiFi'],
      optional: [['Telecomando IR touch', 43]],
      incentive: [689.65, 977.00, 1264.35, 1609.18, 1954.00, 2068.94],
      official: 'https://www.lanordica-extraflame.com/it/pellet/stufe-pellet/angelica-evo'
    },
    {
      id: 'klaudia',
      name: 'Klaudia Plus AD Evo',
      brand: 'La Nordica-Extraflame',
      type: 'pellet',
      kind: 'Stufa a pellet ermetica canalizzata',
      img: 'assets/img/klaudia-plus.jpg',
      pos: '56% 50%',
      price: 1990,
      tagline: 'Il calore arriva più lontano.',
      text: 'Rivestimento in acciaio verniciato e top in maiolica. Canalizzazione termostatabile ed escludibile e WiFi di serie.',
      highlights: ['8 kW', 'Canalizzata', 'WiFi di serie', '5 stelle'],
      finishes: [
        { name: 'Bordeaux', code: '001297150', list: 2540 },
        { name: 'Nero', code: '001297151', list: 2540 },
        { name: 'Bianco', code: '001297152', list: 2540 }
      ],
      specs: [
        ['Potenza nominale', '3,0–8,0 kW'],
        ['Volume riscaldabile', '229 m³'],
        ['Rendimento', '94–91 %'],
        ['Rendimento stagionale', '80 %'],
        ['Consumo orario', '0,7–1,8 kg/h'],
        ['Assorbimento elettrico', '31–64 W'],
        ['Dimensioni (L × H × P)', '498 × 1017 × 576 mm'],
        ['Peso netto', '106 kg'],
        ['Scarico fumi', '80 mm (posteriore/superiore)'],
        ['Uscita ventilazione', 'Frontale'],
        ['Canalizzazione', '80 mm (posteriore), 1 uscita fino a 8 m'],
        ['Serbatoio pellet', '15 kg']
      ],
      features: [
        'Canalizzazione termostatabile ed escludibile',
        'Scambiatore di calore a fascio tubiero con pulizia automatica',
        'Porta fuoco, focolare e braciere in ghisa',
        'Vano cenere estraibile',
        'Candeletta ceramica',
        'Funzioni Easy Setup, Air Zone Control, Pro Air Setup e App Total Control 3.0'
      ],
      standard: ['Display LCD WiFi'],
      optional: [['Telecomando IR touch', 43]],
      incentive: [689.65, 977.00, 1264.35, 1609.18, 1954.00, 2068.94],
      official: 'https://www.lanordica-extraflame.com/it/pellet/stufe-pellet/klaudia-plus-ad-evo'
    },
    {
      id: 'larissa',
      name: 'Larissa',
      brand: 'La Nordica-Extraflame',
      type: 'legna',
      kind: 'Stufa a legna',
      img: 'assets/img/larissa.jpg',
      pos: '50% 60%',
      tagline: 'Il fascino della legna.',
      text: 'Una presenza che dà carattere ai tuoi spazi. Scrivici per prezzo, disponibilità e scheda tecnica.'
    },
    {
      id: 'floriana',
      name: 'Floriana Crystal',
      brand: 'Extraflame',
      type: 'pellet',
      kind: 'Stufa a pellet',
      img: 'assets/img/floriana-crystal.jpg',
      pos: '50% 55%',
      tagline: 'Il calore prende forma.',
      text: 'Il pellet incontra il design della tua casa. Scrivici per prezzo, disponibilità e scheda tecnica.'
    }
  ],

  // Le altre categorie trattate in showroom
  categories: [
    { id: 'pellet', name: 'Stufe a pellet', text: 'Modelli, foto, schede tecniche e incentivi.', filter: 'pellet' },
    { id: 'legna', name: 'Stufe a legna', text: 'Il piacere del fuoco e il calore della tradizione.', filter: 'legna' },
    { id: 'piastrelle', name: 'Piastrelle', text: 'Superfici per pavimenti e rivestimenti.' },
    { id: 'arredo-bagno', name: 'Arredo bagno', text: 'Dettagli che danno spazio al benessere.' },
    { id: 'sanitari', name: 'Sanitari', text: 'Forme e soluzioni per il tuo bagno.' },
    { id: 'rubinetterie', name: 'Rubinetterie', text: 'Il dettaglio che completa il tuo stile.' },
    { id: 'mobili-bagno', name: 'Mobili da bagno', text: 'Spazio, ordine e personalità.' },
    { id: 'parquet', name: 'Parquet', text: 'La bellezza del legno, ogni giorno.' }
  ]
};
