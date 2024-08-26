import React from 'react'
import SingleCreator from './SingleCreator';
const data = [
    { id: 1, orber: 'Alice', creator:'vince', image:'/images/Image.png' },
    { id: 2, orber: 'Bob', creator:'vince', image:'/images/Image.png' },
    { id: 3, orber: 'Charlie', creator:'vince', image:'/images/Image.png' },
    { id: 4, orber: 'Diana', creator:'vince', image:'/images/Image.png' },
    { id: 5, orber: 'Charlie', creator:'vince', image:'/images/Image.png' },
    { id: 6, orber: 'Diana', creator:'vince', image:'/images/Image.png' }
  ];
export default function CreatorsContent() {
  return (
    <section className='mt-[96px]'>
        <div className="">
            <h2 className="text-[44px] text-[#FFFFFF] font-bold leading-[52.8px] -tracking-[0.5px] text-center">Creators Around the Globe Trust Us</h2>
            <p className="w-[52%] text-center mx-auto text-[16px] font-bold leading-6 tracking-[0.15px] text-[#FFFFFF] mt-1">From artists to writers, podcasters, and more, countless creators are thriving with Orbspace</p>
        </div>

        <div className="w-[90%] mx-auto mt-9">
            <div className="flex gap-4 flex-wrap">
                {data.map((props)=>(
                    <div className="" key={props.id}>

                        <SingleCreator image={props.image} orber={props.orber} creator={props.creator} />
                    </div>

                ))}
            </div>
        </div>
    </section>
  )
}
