import https from 'https';
import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer';
import Header from '../components/Header'
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export default function Home({data,cardData}) {
 
  return (
    <div className="">
      <Head>
        <title>Holiday App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
   <Header/>
    <Banner />

    <main className='max-w-7xl mx-auto sm:px-16'>
      <section className='pt-6'>
        <h2 className='text-4xl font-semibold pb-5'>Explore Nearby</h2>
        {/* Pull some data from a server-API endpoints */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {data?.map(({img,distance,location}) =>(
            
            <SmallCard 
            key={img} 
            img={img} 
            distance={distance} 
            location ={location} 
            />
            
           ))}
        </div>
         
      </section>
      <section>
      <h2 className='text-4xl font-semibold py-8'>Live Anywhere</h2>

        <div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
        {cardData?.map(( {img, title})=>(
          
             <MediumCard 
              key={img} 
              img={img}
              title={title}/>
             
        ))}
        </div>
      </section>
      <LargeCard 
       img="https://links.papareact.com/4cj"
       title="The Greatest Outdoors by holiday."
       description="wishlists curated by Airbnb"
       buttonText="Get Inspired"
      />

    </main>
     <Footer/>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://www.jsonkeeper.com/b/4G1G",{
    agent: httpsAgent,
  }
    
  );
  const data = await res.json();
  //@ 2nd API call
  const card = await fetch(" https://jsonkeeper.com/b/3T6P",{
    agent: httpsAgent,
  } );
  const cardData = await card.json();

  return {
      props: {
          data,
         cardData,
      },
  };
}

