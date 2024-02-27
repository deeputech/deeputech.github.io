---
layout: page
title: Upcoming Events
permalink: /appearances
comments: false
---

<div class="row special">
  {% capture talks %}{% include talks.md %}{% endcapture %} {{ talks | markdownify }}
</div>

Check [my sessionize profile](https://sessionize.com/deepu-k-sasidharan/) for more details about the talks and events. [Here](https://www.youtube.com/playlist?list=PLxayiD7e52nPpb-sSaoOPc-zXGhmOaNHK) are some of the videos from my talks.

---

<div class="section-title">
  <h2><span>Past Events</span></h2>
</div>

<div>
  {% capture talks_past %}{% include talks-past.md %}{% endcapture %} {{ talks_past | markdownify }}
</div>
