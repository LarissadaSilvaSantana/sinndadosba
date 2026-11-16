import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { AuthService } from '../services/auth.service';
import { Acordo, MockDataService, Noticia } from '../services/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SINDADOS-BA</ion-title>
        <ion-button slot="end" fill="clear" color="light" (click)="sair()">Sair</ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="welcome-card">
        <h2>Olá, trabalhador associado!</h2>
        <p>Acompanhe as notícias da categoria e consulte os acordos vigentes.</p>
      </div>

      <ion-segment [value]="tabAtiva" (ionChange)="trocarTab($event.detail.value)">
        <ion-segment-button value="noticias">
          <ion-label>Notícias</ion-label>
        </ion-segment-button>
        <ion-segment-button value="acordos">
          <ion-label>ACTs / CCTs</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div *ngIf="tabAtiva === 'noticias'" class="ion-margin-top">
        <ion-card *ngFor="let noticia of noticias">
          <ion-card-header>
            <ion-card-title>{{ noticia.titulo }}</ion-card-title>
            <ion-card-subtitle>{{ noticia.data }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <p>{{ noticia.resumo }}</p>
          </ion-card-content>
        </ion-card>
      </div>

      <div *ngIf="tabAtiva === 'acordos'" class="ion-margin-top">
        <ion-card *ngFor="let acordo of acordos">
          <ion-card-header>
            <ion-card-title>{{ acordo.titulo }}</ion-card-title>
            <ion-card-subtitle>{{ acordo.vigencia }}</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <div class="status-row">
              <ion-badge [color]="acordo.status === 'Vigente' ? 'success' : 'warning'">
                {{ acordo.status }}
              </ion-badge>
            </div>
            <p>{{ acordo.resumo }}</p>
            <ion-button expand="block" fill="outline" (click)="mostrarDetalhes(acordo)">Ver cláusulas principais</ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .welcome-card {
        background: linear-gradient(135deg, #0d3b66, #1d7ae0);
        color: #fff;
        border-radius: 18px;
        padding: 1.25rem;
        margin-bottom: 1rem;
      }

      .welcome-card h2,
      .welcome-card p {
        margin: 0;
      }

      .welcome-card p {
        margin-top: 0.5rem;
      }

      .status-row {
        margin-bottom: 0.75rem;
      }

      ion-card {
        margin-bottom: 1rem;
      }
    `,
  ],
  imports: [
    CommonModule,
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar,
  ],
})
export class HomePage {
  tabAtiva = 'noticias';

  noticias: Noticia[];
  acordos: Acordo[];

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertController: AlertController,
    dados: MockDataService,
  ) {
    this.noticias = dados.noticias;
    this.acordos = dados.acordos;
  }

  trocarTab(value: string | number | null | undefined): void {
    this.tabAtiva = typeof value === 'string' ? value : 'noticias';
  }

  async mostrarDetalhes(acordo: Acordo): Promise<void> {
    const alert = await this.alertController.create({
      header: acordo.titulo,
      message: `${acordo.resumo} \n\n Vigência: ${acordo.vigencia}`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  sair(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
