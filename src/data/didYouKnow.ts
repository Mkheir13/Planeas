import { DidYouKnowFact } from '../types';

export const didYouKnowFacts: DidYouKnowFact[] = [
  // Identité
  {
    id: 'gender-pollution',
    category: 'identity',
    question: 'Homme ou femme : qui pollue le plus ?',
    answer: 'Les hommes ont en moyenne une empreinte carbone 16% plus élevée que les femmes, notamment à cause des transports et de la consommation énergétique.',
    icon: 'Users'
  },
  {
    id: 'relationship-footprint',
    category: 'identity',
    question: 'Célibataire ou en couple : qui pollue le plus ?',
    answer: 'Vivre en couple réduit l\'empreinte carbone par personne de 17% grâce au partage des ressources et des équipements.',
    icon: 'Heart'
  },

  // Logement
  {
    id: 'heating-comparison',
    category: 'logement',
    question: 'Chauffage au fioul vs électrique ?',
    answer: 'Le chauffage au fioul émet 3 fois plus de CO2 que l\'électricité en France grâce au nucléaire ! 1 litre de fioul = 2,7 kg de CO2.',
    icon: 'Flame'
  },
  {
    id: 'insulation-impact',
    category: 'logement',
    question: 'L\'isolation, ça change quoi ?',
    answer: 'Une bonne isolation peut réduire votre consommation de chauffage de 60% et économiser 2 tonnes de CO2 par an !',
    icon: 'Home'
  },
  {
    id: 'surface-impact',
    category: 'logement',
    question: 'Pourquoi la surface compte ?',
    answer: 'Chaque m² supplémentaire représente 20 kg de CO2 par an en chauffage. Un 100m² émet 2x plus qu\'un 50m² !',
    icon: 'Maximize'
  },
  {
    id: 'living-alone',
    category: 'logement',
    question: 'Vivre seul, quel impact ?',
    answer: 'Vivre seul augmente votre empreinte de 42% : pas de partage des équipements, du chauffage, des appareils électroniques...',
    icon: 'User'
  },

  // Transport
  {
    id: 'car-vs-cow',
    category: 'transport',
    question: 'Voiture ou vache : qui pollue le plus ?',
    answer: 'Une vache émet environ 4 tonnes de CO2 par an, soit l\'équivalent de 18 000 km en voiture essence !',
    icon: 'Car'
  },
  {
    id: 'flight-impact',
    category: 'transport',
    question: 'L\'impact d\'un vol Paris-New York ?',
    answer: 'Un vol aller-retour Paris-New York émet 2,3 tonnes de CO2, soit autant qu\'une voiture pendant toute une année !',
    icon: 'Plane'
  },
  {
    id: 'cruise-pollution',
    category: 'transport',
    question: 'Une croisière, c\'est grave docteur ?',
    answer: 'Une semaine de croisière émet 1,8 tonnes de CO2 par personne, soit 3x plus qu\'un vol Paris-New York !',
    icon: 'Ship'
  },
  {
    id: 'electric-vs-thermal',
    category: 'transport',
    question: 'Électrique vs thermique : le match ?',
    answer: 'Une voiture électrique émet 2x moins de CO2 qu\'une essence sur sa durée de vie, même en comptant la fabrication !',
    icon: 'Zap'
  },
  {
    id: 'public-transport-impact',
    category: 'transport',
    question: 'Transports en commun : efficaces ?',
    answer: 'Prendre le métro plutôt que sa voiture divise vos émissions par 10 ! 1 km en métro = 4g CO2 vs 120g en voiture.',
    icon: 'Bus'
  },

  // Alimentation
  {
    id: 'meat-water',
    category: 'alimentation',
    question: 'Combien d\'eau pour 1kg de bœuf ?',
    answer: 'Il faut 15 400 litres d\'eau pour produire 1kg de bœuf, soit l\'équivalent de 100 bains ! Le porc : 4 900L, le poulet : 3 300L.',
    icon: 'Droplets'
  },
  {
    id: 'food-waste-impact',
    category: 'alimentation',
    question: 'Le gaspillage alimentaire en chiffres ?',
    answer: 'Si le gaspillage alimentaire était un pays, il serait le 3ème plus gros émetteur de CO2 au monde ! 1/3 de la nourriture est gaspillée.',
    icon: 'Trash2'
  },
  {
    id: 'meat-co2',
    category: 'alimentation',
    question: '1 steak = combien de CO2 ?',
    answer: 'Un steak de bœuf de 200g émet 7 kg de CO2, soit 35 km en voiture ! Un steak de porc : 1,4 kg, de poulet : 0,8 kg.',
    icon: 'Beef'
  },
  {
    id: 'local-vs-imported',
    category: 'alimentation',
    question: 'Local vs importé : la différence ?',
    answer: '1 kg de tomates d\'Espagne en hiver émet 20x plus de CO2 que des tomates locales de saison !',
    icon: 'MapPin'
  },

  // Consommation
  {
    id: 'jeans-journey',
    category: 'consommation',
    question: 'Un jean : combien de pays parcourus ?',
    answer: 'Un jean parcourt en moyenne 65 000 km avant d\'arriver dans votre garde-robe, traversant jusqu\'à 8 pays différents.',
    icon: 'Globe'
  },
  {
    id: 'fast-fashion',
    category: 'consommation',
    question: 'La fast fashion, quel impact ?',
    answer: 'L\'industrie textile pollue plus que l\'aviation et le transport maritime réunis ! 1 t-shirt = 2 700L d\'eau.',
    icon: 'Shirt'
  },
  {
    id: 'repair-vs-buy',
    category: 'consommation',
    question: 'Réparer ou racheter ?',
    answer: 'Réparer un smartphone évite l\'émission de 70 kg de CO2. Garder son téléphone 4 ans au lieu de 2 divise son impact par 2 !',
    icon: 'Wrench'
  },
  {
    id: 'smartphone-impact',
    category: 'consommation',
    question: 'Un smartphone, quel impact ?',
    answer: 'Fabriquer un smartphone émet 70 kg de CO2, soit 350 km en voiture ! 80% de l\'impact vient de la fabrication.',
    icon: 'Smartphone'
  },
  {
    id: 'second-hand-power',
    category: 'consommation',
    question: 'Le pouvoir de l\'occasion ?',
    answer: 'Acheter d\'occasion divise l\'impact environnemental par 10 ! Un jean d\'occasion évite 25 kg de CO2.',
    icon: 'RefreshCw'
  },

  // Déchets
  {
    id: 'recycling-impact',
    category: 'déchets',
    question: 'Le tri, ça sert vraiment ?',
    answer: 'Recycler 1 tonne de plastique évite l\'émission de 1,5 tonnes de CO2. Trier ses déchets peut réduire son empreinte de 10% !',
    icon: 'Recycle'
  },
  {
    id: 'packaging-waste',
    category: 'déchets',
    question: 'Les emballages en chiffres ?',
    answer: 'Les emballages représentent 30% de nos déchets ! Choisir des produits sans emballage peut réduire vos déchets de 50%.',
    icon: 'Package'
  },
  {
    id: 'trash-bag-impact',
    category: 'déchets',
    question: '1 sac poubelle = combien de CO2 ?',
    answer: 'Un sac poubelle de 30L représente 2 kg de CO2 (collecte + traitement). Réduire d\'1 sac/semaine = 100 kg CO2/an économisés !',
    icon: 'Trash'
  }
];