import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagensUsuarioComponent } from './postagens-usuario.component';

describe('PostagensUsuarioComponent', () => {
  let component: PostagensUsuarioComponent;
  let fixture: ComponentFixture<PostagensUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostagensUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostagensUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
