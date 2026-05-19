import React from 'react'
import MainCrosel from '../../components/homeCarsol/MainCrosel'
import HomeSectionCarosel from '../../components/homeSectionCarosel/HomeSectionCarosel'
import { mens_kurta } from '../../../Data/mens_kurta'

export default function HomePage() {
    return (
        <div>
            <MainCrosel />
            <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
                <HomeSectionCarosel data={mens_kurta} sectionName={"Men's Kurta"} />
                <HomeSectionCarosel data={mens_kurta} sectionName={"Men's Shoes"} />
                <HomeSectionCarosel data={mens_kurta} sectionName={"Men's Shirt"} />
                <HomeSectionCarosel data={mens_kurta} sectionName={"Women's Saree"} />
                <HomeSectionCarosel data={mens_kurta} sectionName={"Women's Dress"} />
            </div>
        </div>
    )
}
