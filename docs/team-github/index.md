# How We'll Be Using GitHub

<script language="javascript" type="text/javascript" src="../../sketches/p5.min.js"></script>
<div id="github-sketch"> </div>
<script language="javascript" type="text/javascript" src="../../sketches/effects.js"></script>
<script language="javascript" type="text/javascript" src="github.js"></script>

- The [SeamonstersTemplate](https://github.com/Seamonsters-2605/SeamonstersTemplate) repository will hold a template for robot code. This includes the seamonsters python library, along with deploy and testing scripts.
- The [SeamonstersDev](https://github.com/Seamonsters-2605/SeamonstersDev) repository is a fork of SeamonstersTemplate, allowing it to automatically get the seamonsters library. It will have robot code that isn't tied to a specific year or competition, like the Stingray demo robot, or testing for the seamonsters library.
    - SeamonstersTemplate is still be an upstream source for SeamonstersDev. If we need to change the seamonsters library, will will modify SeamonstersTemplate and merge the changes into SeamonstersDev, or any other forks.
- For the 2017 competition (and future competitions) we will fork SeamonstersTemplate as CompetitionBot2017, and merge any updates as described above.
    - If a team member needs to change the competition bot code, they would either make a new branch or fork CompetitionBot2017 to their own GitHub account. When they are finished they would make a pull request.
