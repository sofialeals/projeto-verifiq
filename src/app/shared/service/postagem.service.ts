import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../../../../arquivo';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  private cliente : SupabaseClient;

  constructor() {
    this.cliente = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  uploadImagem(){
    
  }
}
