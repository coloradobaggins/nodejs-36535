import { serve } from 'https://deno.land/std@0.152.0/http/server.ts';

const PORT=3001;

//Limpiar localStorage al inicio.
localStorage.clear();

const colors = [];

const requestHandler = (req)=>{
    
    const {pathname} = new URL(req.url);



    switch(pathname){
        case '/addColor':
            
            let responseMsg = '';

            const url = new URL(req.url);
            const color = url.searchParams.get('color');

            if(color !== null){

                colors.push(color);

                localStorage.setItem('colorsItem', JSON.stringify(colors));

            }


            return new Response(JSON.parse(localStorage.getItem('colorsItem')));

        case '/colors':

            return new Response(JSON.parse(localStorage.getItem('colorsItem')));

        default:
            return new Response("Desafio 21 - ir a GET: /colors o /addColor");
    }

   
}

serve(requestHandler, {port: PORT});