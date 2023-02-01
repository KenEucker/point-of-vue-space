# This is a fork of Modrinth's latest code

I started this project to see if I could pull all of the Modrinth specific items out of the platform, so that I may use Knossos for another project. Both projects being AGPL-3.0, I felt like this was an appropriate thing to do, and I'm excited to be able to work with such a great body of code. I am seriously impressed by this platform.

I have a rough plan of how I want to accomplish this task...

## How I plan to do it

[ ] Move all references to what might be Modrinth specific content to localized constants in the (iDb)
[ ] Create a dependency injenction wrapper around the api interactions required to run the application
[ ] Stand up an identical API interface to the one used by Modrinth, (only simpler? is that possible?)
[ ] Move the idiot database to a CMS based content repository
[ ] Add tailwind and replace all styles with tailwind classes
[ ] Move all colors to a theme within tailwind
[ ] Make the theme editable in the CMS
[ ] Start to make changes in the CMS and see if it all works as expected

## If you are reading this

Thanks! I hope that my work continues to inspire and be of help. If you are offended by this work in any way please reach out and let me know. If you are from the Modrinth team, please know that I have sent in an application for an open position at your company. I keep telling myself that if this project fails that at least I will have learned a lot, which might be beneficial one day if I get the opportunity to work with y'all.

# Modrinth's README content

![knossos banner](https://user-images.githubusercontent.com/12068027/100479893-d9b5a380-30ac-11eb-9db9-0c09d400f13f.png)

## Modrinth's center for its frontend service

For contributing information, please see the knossos section of the [Modrinth contributing guide](https://docs.modrinth.com/docs/details/contributing/#knossos-frontend).

For a detailed explanation on how things work in general, check out the [Nuxt.js docs](https://nuxtjs.org).
