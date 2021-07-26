import knex from '../database/connection';
import { DateTime } from 'luxon'
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