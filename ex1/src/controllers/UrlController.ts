import { Request, Response } from "express";
import { UrlService } from "../service/UrlService";

class UrlController{

  async create(req: Request, res: Response){
    const { url } = req.body;

    const urlService = new UrlService();

    const urlConverted = await urlService.create({url});

    return res.json({
      message: "Url shorter created successful!!"
    })
  }
}

export { UrlController }