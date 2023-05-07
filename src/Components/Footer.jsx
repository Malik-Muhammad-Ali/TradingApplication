import Trading from './Trading.png';

const Footer = ()=>{

  const date = new Date();
  
  return (
    <>
      <div className='bg-dark text-white p-3' style={{fontFamily: "sans-serif", fontSize: "24px"}}>
        <div className='d-flex'>
          <img src={Trading} />
            <p className='mt-5 m-5'>This is a Real time Trading Web App for pacticing your Trading Experience. The Stock data displayed on this website is real.</p>
        </div>
        <p style={{marginLeft: "40vw"}}>Copyright © {date.getFullYear()}</p>
      </div>
    </>
  )
}

export default Footer;