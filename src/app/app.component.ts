import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({selector:'app-root',standalone:true,imports:[RouterOutlet,RouterLink,RouterLinkActive],template:`
<header class="site-header"><div class="nav"><a routerLink="/" class="brand"><span class="brand-leaf">🌿</span><span>Agricultural Advisory Portal</span></a><nav><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a><a routerLink="/register" routerLinkActive="active">Register</a><a routerLink="/advisory" routerLinkActive="active">Advisory</a><a routerLink="/crops" routerLinkActive="active">Crops</a><a routerLink="/market" routerLinkActive="active">Market</a><a routerLink="/contact" routerLinkActive="active">Contact</a></nav></div></header>
<main><router-outlet /></main>
<footer class="site-footer"><div class="footer-brand">🌱 <b>Agricultural Advisory Portal</b></div><div class="footer-motto">🌿 Healthy Crops <span>|</span> Better Farmers <span>|</span> A Greener Tomorrow</div><div>© 2025 Agricultural Advisory Portal</div></footer>`}) export class AppComponent {}
