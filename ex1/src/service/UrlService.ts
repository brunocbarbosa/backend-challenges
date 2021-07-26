import { DateTime } from 'luxon'
import knex from '../database/connection';
import { randomUrl } from '../utils/functions'

interface IUrlRequest{
  url: string;
}

class UrlService{

  async getAll(){
    const urls = await knex('url_shortener')
      .select('*');

    return urls;
  }

  async redirectAnotherPage(shortUrl: string){
    const url = await knex('url_shortener')
      .where('shortened', shortUrl)
      .select('url', 'expired_at')
      .first()

    const date = DateTime.now().toISODate()

    if(url.expired_at <= date) throw new Error('Erro 404: Link expirado')

    return url.url;
  }
  
  async create({ url }: IUrlRequest){
    
    const trx = await knex.transaction();

    const shortened = randomUrl(5, 10);
    
    const urlConverter = await trx('url_shortener').insert({
      url,
      shortened,
    })

    await trx.commit();
    
    return urlConverter
  }
}

export {UrlService}