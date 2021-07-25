import knex from '../database/connection';
import { DateTime } from 'luxon'
import { randomUrl } from '../utils/functions'

interface IUrlRequest{
  url: string;
}

class UrlService{
  
  async create({ url }: IUrlRequest){
    
    const trx = await knex.transaction();

    const shortened = randomUrl(5, 10);

    console.log("shortened: ",shortened);

    // const expired_at = DateTime.local().plus({days:3})

    // console.log("expired_at: ",expired_at);
    
    const urlConverter = await trx('url_shortener').insert({
      url,
      shortened,
    })

    await trx.commit();
    
    return urlConverter
  }
}

export {UrlService}