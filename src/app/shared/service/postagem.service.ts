import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_KEY, SUPABASE_URL } from '../../../../arquivo';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  private supabase : SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

  capturarMidia(upload : Event) : File | null{
    const input = upload.target as HTMLInputElement;
    const midia : File | null = null;

    if(input.files && input.files.length > 0){
      const midia = input.files[0];
    }

    return midia;
  }

  async obterUrl(midia : File){
    const { data, error } = await this.supabase
      .storage
      .from('midia-postagens')
      .upload(`imagens-e-videos/${midia.name}`, midia);

    if(error){
      throw error;
    }

    const url = this.supabase
      .storage
      .from('midia-postagens')
      .getPublicUrl(`imagens-e-videos/${midia.name}`);

    return url;
  }
}
