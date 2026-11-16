import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>SINDADOS-BA</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="login-wrapper">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Login</ion-card-title>
            <ion-card-subtitle>Área restrita para associados</ion-card-subtitle>
          </ion-card-header>

          <ion-card-content>
            <ion-list lines="full">
              <ion-item>
                <ion-label position="stacked">E-mail ou matrícula</ion-label>
                <ion-input
                  type="email"
                  [(ngModel)]="email"
                  placeholder="associado@sindados.org.br"
                ></ion-input>
              </ion-item>

              <ion-item>
                <ion-label position="stacked">Senha</ion-label>
                <ion-input type="password" [(ngModel)]="password" placeholder="123456"></ion-input>
              </ion-item>
            </ion-list>

            <ion-button expand="block" shape="round" class="ion-margin-top" (click)="entrar()">
              Entrar
            </ion-button>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  `,
  styles: [
    `
      .login-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100%;
      }

      ion-card {
        width: min(100%, 420px);
      }
    `,
  ],
  imports: [
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
  ],
})
export class LoginPage {
  email = 'associado@sindados.org.br';
  password = '123456';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly alertController: AlertController,
  ) {}

  async entrar(): Promise<void> {
    if (!this.email.trim() || !this.password.trim()) {
      await this.mostrarAlerta('Dados obrigatórios', 'Informe e-mail/matrícula e senha para continuar.');
      return;
    }

    const loginValido = this.authService.login(this.email, this.password);

    if (loginValido) {
      await this.router.navigateByUrl('/home');
      return;
    }

    await this.mostrarAlerta(
      'Acesso negado',
      'Credenciais inválidas. Tente usar associado@sindados.org.br com a senha 123456.',
    );
  }

  private async mostrarAlerta(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}