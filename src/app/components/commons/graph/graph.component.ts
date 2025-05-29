import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);
// Enregistrement des composants Chart.js et du plugin DataLabels

@Component({
  selector: 'app-graph',
  imports: [],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  // Propriétés d'entrée passées depuis le composant parent
  @Input() chartData: any[] = []; // Les données du graphique
  @Input() chartLabels: string[] = []; // Les étiquettes des segments ou colonnes
  @Input() chartType: keyof ChartTypeRegistry = 'pie'; // Type de graphique (par défaut 'pie')
  @Input() chartTitle: string = ''; // Titre du graphique
  @Input() chartColors: string[] = []; // Couleurs des segments ou colonnes

  // Référence au canvas HTML où le graphique sera dessiné
  @ViewChild('chartCanvas', { static: false }) chartCanvas:
    | ElementRef
    | undefined;

  private chart: any; // Instance du graphique Chart.js

  constructor() {}

  // Méthode appelée après la création de la classe
  ngOnInit(): void {}

  // Méthode appelée après le chargement de la vue
  ngAfterViewInit(): void {
    // Utilisation de setTimeout pour attendre que les données soient disponibles
    setTimeout(() => {
      if (this.chartData.length && this.chartLabels.length) {
        this.createChart(); // Créer le graphique si les données et les étiquettes sont disponibles
      } else {
        console.error('Données ou labels manquants pour créer le graphique'); // Message d'erreur en cas de données manquantes
      }
    }, 500); // Délai de 500ms pour éviter des problèmes de rendu
  }

  // Méthode privée pour créer le graphique
  private createChart(): void {
    const colors = this.chartColors; // Récupération des couleurs passées en entrée

    // Configuration pour afficher ou non la légende en fonction du type de graphique
    const legendDisplay = this.chartType !== 'bar';

    let dataLabelOffset = -10; // Valeur par défaut pour offset
    if (this.chartType === 'pie' || this.chartType === 'doughnut') {
      dataLabelOffset = 10; // Ajuster l'offset pour les graphiques de type pie/doughnut
    } else if (this.chartType === 'bar') {
      dataLabelOffset = -7; // Ajuster l'offset pour les graphiques de type bar
    }

    // Options de configuration du graphique
    const options = {
      responsive: true, // Adapte le graphique à la taille de l'écran
      layout: {
        padding: {
          // Espacement autour du graphique
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          display: legendDisplay, // Affiche ou masque la légende
          position: 'right', // Position de la légende à droite
          labels: {
            boxWidth: 20, // Taille des carrés colorés dans la légende
            padding: 10, // Espacement entre les éléments de la légende
            font: {
              size: 14,
              weight: 'bold', // Style du texte dans la légende
            },
          },
        },
        tooltip: {
          // Configuration des infobulles
          callbacks: {
            label: (tooltipItem: { label: string; raw: any }) => {
              // Affiche les données sous la forme "label: valeur"
              const label = tooltipItem.label || '';
              return `${label}: ${tooltipItem.raw}`;
            },
          },
        },
        datalabels: {
          font: {
            weight: 'bold',
            size: 16,
          },
          anchor: 'end',
          align: 'start',
          clip: false,
          offset: dataLabelOffset,
          padding: 10,
          color: (context: any) => {
            // Vérifiez si backgroundColor existe dans le dataset
            const backgroundColor = context.dataset?.backgroundColor
              ? context.dataset.backgroundColor[context.dataIndex]
              : null;

            // Si une couleur de fond est définie, utilisez-la, sinon retournez une couleur par défaut
            if (backgroundColor) {
              return this.isDarkColor(backgroundColor) ? '#FFFFFF' : '#000000';
            }
            return '#000000'; // Valeur par défaut si aucune couleur n'est définie
          },
          formatter: (value: any) => value,
        },
        title: {
          // Configuration du titre du graphique
          display: true, // Afficher le titre
          text: this.chartTitle, // Texte du titre
          font: {
            size: 22,
            weight: 'bold', // Style de la police du titre
          },
          padding: {
            top: 20, // Espacement en haut
            bottom: 20, // Espacement en bas
          },
          align: 'center', // Alignement centré
        },
      },
    };

    // Création de l'objet Chart.js avec le type, les données et les options
    this.chart = new Chart(this.chartCanvas?.nativeElement, {
      type: this.chartType, // Type de graphique ('pie', 'bar', etc.)
      data: {
        labels: this.chartLabels, // Étiquettes pour les segments ou colonnes
        datasets: [
          {
            data: this.chartData, // Données pour chaque segment ou colonne
            backgroundColor: colors, // Couleurs associées aux segments
            borderColor: '#000000', // Bordure externe noire
            borderWidth: 1, // Largeur des bordures
          },
        ],
      },
      options: options as any, // Conversion pour satisfaire le typage TypeScript
    });
  }

  // Fonction utilitaire pour déterminer la luminosité d'une couleur
  private isDarkColor(color: string): boolean {
    // Conversion du code couleur hexadécimal en valeurs RGB
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    // Calcul de la luminosité perçue
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Retourne true si la luminosité est faible (couleur foncée)
    return brightness < 128;
  }
}
