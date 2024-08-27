import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExibirPostagensComponent } from './exibir-postagens.component';

describe('ExibirPostagensComponent', () => {
  let component: ExibirPostagensComponent;
  let fixture: ComponentFixture<ExibirPostagensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExibirPostagensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExibirPostagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
