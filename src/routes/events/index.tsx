import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import Card from '~/components/card/card';




export default component$(() => {
    return(
      <div class="flex flex-col items-center content-center lg:py-20 py-10 mt-16 lg:mt-0">
      <div class="mx-auto w-full">


      <div class="flex flex-row lg:ml-20 lg:h-56 h-72 items-center content-center">
    <div class="w-3 h-44 lg:block shadow-lg hidden my-auto rounded-full bg-white bg-opacity-70"></div>
    <div class="flex flex-col my-auto lg:pl-10  my-20 lg:py-0 lg:pt-0 ">
    <h1 class="font-bold text-white drop-shadow-xl font-poppins mb-2 lg:mb-[4px] lg:text-blue-50  text-4xl md:text-5xl lg:text-5xl mx-auto lg:mx-0 block">Verseny'22</h1>
    <h1 class=" font-poppins leading-loose font-medium  lg:font-normal lg:pl-1 sm:text-lg text-md mx-auto lg:mx-0 my-4 mt-2 md:mt-4 lg:my-0 text-white lg:text-blue-100  lg:text-left text-center lg:text-[20px] md:w-4/6 md:leading-9 px-9 md:px-0 lg:mt-3 lg:leading-8">Verseny'22 is the flagship event of Swarnotsav. It refers to an array of interschool events organized to engage and empower young pupils. <span class="hidden sm:inline-block xl:block"> Scroll down to view them.</span></h1>
    <a href="/registration" class="lg:mx-0 mx-6 bg-white shadow-2xl font-medium lg:font-semibold font-poppins text-blue-900 px-10 mt-3 mb-3 block lg:hidden lg:mt-0 transition-all ease-linear duration-100 hover:scale-105 py-3 rounded-md text-lg text-center"><span class="mx-auto">Register Now</span></a>

    </div>
    </div>
     
    <div class="grid 2xl:grid-cols-3  md:grid-cols-2 grid-cols-1  grs lg:mx-20 lg:my-10 lg:mt-0 mt-0 ">
       
    <Card title="Clash Of Minds" url="debate" src="img1.jpg" desc="Clash of Minds (Debate), Schools will be competing for a single contradicting topic in Tamil."></Card>
    <Card title="Perspective Drawing" url="perspective" src="img2.jpg"  desc="Imagine and Draw on the spot."></Card>
    <Card title="Creative Singing" url="singing" src="img3.jpg"  desc="Participants can sing creatively comprising of Beat Box, Own songs, Remix, etc by using their own creative equipments"></Card>
    <Card title="Group Dance" url="grpdance" src="img4.jpg"  desc="The participants shall perform any type of dance styles like folk/classical/dance representing any state."></Card>
    <Card title="Mime" url="mime" src="img4.jpg"  desc="Theme : Any interesting incident in your school life"></Card>
    <Card title="Short Film" url="film" src="img4.jpg" desc="Theme : Self realisation"></Card>
    <Card title="Ad Act" url="adact" src="img4.jpg" desc="Participants will be given a product image. They should use their creativity to convince the customers to buy them."></Card>
    <Card title="Story Writing" url="story" src="img4.jpg"  desc="Participants can take 3 hints from a bowl and develop a story from those hints in either English or Tamil."></Card>
    <Card title="Young Tycoons" url="young" src="img4.jpg" desc="Participanyts shall choose a product of their own and explain about their product and startup ideas to the judges."></Card>
    <Card title="Skit" url="skit" src="img4.jpg" desc="Theme : Solution for any social issue."></Card>
    <Card title="General Quiz" url="quiz" src="img4.jpg" desc="Written logical question paper will be given. The short listed participants will be selected for the second round."></Card>
    <Card title="Trivia Night" url="trivia" src="img4.jpg"  desc="A situation will be given. The teams are to analyse the situation in a given time.The team also will be questioned based on the situation."></Card>
    <Card title="Turn Coat" url="turn-coat" src="img4.jpg"  desc="Turn Coat will be in the form of lot process. Schools will be competing for a single contradicting topic in English."></Card>
    <Card title="As You Like It" url="asyou" src="img4.jpg" desc="Nail Art, Mehandi, Art from Waste, Calligraphy, etc:- and other unique talents also can be exhibited."></Card>
    <Card title="Treasure Hunt" url="treasure" src="img4.jpg"  desc="The game leads the seekers through a set of clues that takes them from place to place to find a treasure."></Card>
    </div>
      </div>
      </div>
    )
})
export const head: DocumentHead = {
    title: 'Swarnotsav',
  };