import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import mapboxgl from 'mapbox-gl';

import { environment } from '../../environments/environment';
@Component({
  selector: 'app-map-viewer',
  imports: [CommonModule],
  templateUrl: './map-viewer.component.html',
  styleUrl: './map-viewer.component.scss'
})
export class MapViewerComponent {
  @ViewChild('map', { static: true }) mapRef!: ElementRef<HTMLDivElement>;
  map!: mapboxgl.Map;

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapRef.nativeElement,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [39.17202861691079 ,  21.401522927245647],
      zoom: 9,
      accessToken: environment.mapbox.accessToken,
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.displayMarker();
    this.displayPolygon();
  }

  displayMarker() {
    const el = document.createElement('div');
  
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="12" fill="#E63946" opacity="0.7"></circle>
        <circle cx="12" cy="12" r="8" fill="#FBFCFD"></circle>
        <circle cx="12" cy="12" r="6" fill="#776fb5"></circle>
      </svg>
    `;
  
    const encoded = encodeURIComponent(svg.trim())
      .replace(/'/g, "%27")
      .replace(/"/g, "%22");
  
    el.style.backgroundImage = `url("data:image/svg+xml,${encoded}")`;
    el.style.width = '32px';
    el.style.height = '32px';
    el.style.backgroundSize = '100%';
    el.style.borderRadius = '50%';
  
    new mapboxgl.Marker(el)
      .setLngLat([39.21872051144204, 21.410472834110937])
      .addTo(this.map);
  }
  
  displayPolygon() {
    this.map.on('load', () => {
      this.map.addSource('polygon', {
        type: 'geojson',
        data: {
          properties: {},
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[39.17202861691079, 21.401522927245647], [39.21872051144204, 21.410472834110937], [39.245499686246724, 21.430927705467706], [39.30249126339516, 21.444349657406516], [39.29081828976235, 21.47118985599395], [39.26678569698891, 21.499302855867697], [39.231766776090474, 21.58680169885809], [39.23794658566079, 21.61425395281621], [39.226273612027974, 21.65957068597736], [39.21872051144204, 21.682542749325187], [39.20842082882485, 21.709338862051528], [39.21293373703394, 21.723561099084527], [39.22872658371363, 21.734723570144386], [39.23181648849879, 21.743015130353783], [39.24737754315957, 21.760641635824417], [39.24602971834798, 21.76409785115044], [39.24462743824406, 21.772985424992132], [39.2415375334589, 21.779361891062074], [39.2430388395583, 21.799466183169663], [39.24631743558505, 21.810556409904585], [39.22949462064364, 21.815656268101755], [39.22297148831942, 21.815337532287277], [39.22056822904208, 21.819799769098857], [39.22503142484286, 21.822986995924396], [39.22066118873622, 21.82992966218874], [39.217142130508684, 21.83471013728059], [39.21345141090419, 21.836940970968882], [39.20443918861415, 21.841004185752105], [39.2002334848788, 21.839092099062576], [39.195856119766496, 21.836383265809705], [39.1907062784579, 21.831841871400567], [39.17906594667603, 21.824895752274102], [39.16773629579713, 21.816608925412726], [39.15812325868775, 21.81182784549393], [39.15434670839478, 21.80449654617336], [39.153316740133064, 21.79238314246019], [39.153316740133064, 21.786963656610624], [39.15366006288697, 21.77803699796379], [39.16018319521119, 21.75539905151572], [39.160869840719, 21.752529197659317], [39.16670632753541, 21.751891444568393], [39.1443903485315, 21.739135788033792], [39.11280465517213, 21.730844003987805], [39.080790546518955, 21.704256395984842], [39.053324726206455, 21.700428550029322], [39.11237623987833, 21.487185020188306]]]
          }
        }
      });

      this.map.addLayer({
        id: 'polygon-layer',
        type: 'fill',
        source: 'polygon',
        layout: {},
        paint: {
          'fill-color': '#0080ff',
          'fill-opacity': 0.4
        }
      });

      this.map.addLayer({
        id: 'polygon-outline',
        type: 'line',
        source: 'polygon',
        layout: {},
        paint: {
          'line-color': '#000',
          'line-width': 2
        }
      });
    });

  }
}
