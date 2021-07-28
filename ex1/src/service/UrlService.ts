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

    console.log("1",url)

    const existsUrl = await knex('url_shortener').where('url', url).first()

    if(existsUrl) throw new Error("Url exists!!")

    const trx = await knex.transaction();

    const shortened = randomUrl(5, 10);
    
    const urlConverter = await trx('url_shortener').insert({
      url,
      shortened,
    })

    await trx.commit();
    
    return urlConverter
  }

  async renewShortUrl({url}: IUrlRequest){
    const existsQuery = await knex('url_shortener')
      .where('url', url)
      .select('id','url', 'expired_at')
      .first()

    const today = DateTime.now().toISODate()

    if(!existsQuery.url) throw new Error("Url doesn't exists!!")
    if(existsQuery.expired_at > today) throw new Error("Url not expired!!")

      
    const trx = await knex.transaction();

    const renewObj = {
      shortened: randomUrl(5, 10),
      updated_at: today,
      expired_at: DateTime.local().plus({days:3}).toISODate()
    }

    const urlRenewed = await trx('url_shortener')
      .where('id', existsQuery.id)
      .update(renewObj)

    await trx.commit();

    return urlRenewed
  }

    
}

export {UrlService}