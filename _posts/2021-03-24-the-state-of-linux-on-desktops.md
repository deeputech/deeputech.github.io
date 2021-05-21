---
title: The state of Linux as a daily use OS in 2021
description: >-
  Let's see what is the state of Linux, for daily use, in 2021 is and if its a
  viable alternative to  Windows and macOS
published: true
featured: true
tags:
  - linux
  - ubuntu
  - fedora
  - kde
series: Linux environment for developers
canonical_url: "https://deepu.tech/the-state-of-linux-on-desktops/"
cover_image: "https://i.imgur.com/sO0DY6V.jpeg"
devto_id: 644327
devto_url: "https://dev.to/deepu105/the-state-of-linux-as-a-daily-use-os-in-2021-1gm6"
---

Please follow me on [Twitter](https://twitter.com/deepu105) for updates and let me know what are your thoughts on Linux in the comments.

---

I got my first PC when I was in high school, in 2003. It was a DIY Intel Pentium 4 PC with 512MB of RAM, running Windows XP. This got me hooked to computers and I even started assembling PCs for others and selling my service as a Windows OS installer (pirated, of course, the middle class in India back then couldn't afford to buy software).

This also made me quite an expert in the Windows XP OS which I loved. I used to get occasional bootable CDs of a Linux distro from my Chip magazine subscription which I would try then forget as they weren't as compelling or user-friendly as Windows back then.

Then came Windows Vista, which I didn't like much, and Windows 8, which I didn't care for, and Windows 10, which seemed decent but still didn't feel as good as XP.

Fast forward to 2016 I made a bold jump to Ubuntu from Windows 10, after 13 years of being a loyal Windows user. I was on Ubuntu for ~6 months then switched to Fedora and never looked back.

Now in 2021, I'm still using [Fedora as my daily driver](https://deepu.tech/my-beautiful-linux-development-environment/). I have macOS from work which I use for work stuff and a Windows 10 [PC for VR gaming](https://deepu.tech/my-vr-gaming-pc-build/).

Ok, now that I have nerded out about my fascination with computers, let's get into the actual topic and see if Linux is good enough as a daily driver even for regular users who just wants a working computer and are not tech-savvy and never want to visit the terminal. Throughout the article, I'll be making some comparisons with the world's most popular OS, Microsoft Windows, and Apple's macOS which, IMO, is unavoidable.

## State of Linux

Linux has come a long way. For those of you, who still think of a terminal and an outdated UI(I know people who still love those UI) when you hear the word Linux, I think you probably haven't seen or worked on a Linux distro in the last 10 years.

When we talk about Linux on Desktop(or Laptop) we are really talking about a Linux distribution, like [Ubuntu](https://ubuntu.com/) or [Fedora](https://getfedora.org/), and hence we need to understand what makes a distribution (distro). A Linux distribution is an Operating System made up of mainly the below:

1. **[The Linux Kernel](https://www.kernel.org/)** - This is the core of the operating system and it is used by all Linux operating systems, including Android and Chrome OS
2. **[Windowing system](https://en.wikipedia.org/wiki/Windowing_system)** - Responsible for managing input peripherals and driving output displays. This is either the legacy [X11](https://en.wikipedia.org/wiki/X_Window_System) or the newer [Wayland](<https://en.wikipedia.org/wiki/Wayland_(display_server_protocol)>) on almost all desktop Linux distros. More and more distros are using Wayland by default now instead of the legacy X11 server. All distros normally support both and you can configure the display sever you prefer as the default
3. **Desktop Environment (DE)** - This forms the GUI shell for the operating system and there is a multitude of options like [Gnome](https://www.gnome.org/), [KDE](https://kde.org/), [Xfce](https://www.xfce.org/) and so on. You can find most distros providing multiple versions each having a different DE. The DE can also include a Window manager like [KWin](https://en.wikipedia.org/wiki/KWin) or [Mutter](<https://en.wikipedia.org/wiki/Mutter_(window_manager)>) that works with the windowing system
4. **Package manager** - Every family of Linux distributions provides a package manager to find and install software and the package manager is unique for every distribution family. For example [APT](<https://en.wikipedia.org/wiki/APT_(software)>), [DNF](<https://en.wikipedia.org/wiki/DNF_(software)>), [pacman](https://wiki.archlinux.org/index.php/pacman) and so on.
5. **Software and tools** - The distributions generally also come with a set of useful default software like a terminal emulator, a shell, a browser, file browser, and so on.

So let's look into different aspects of Linux and see if it is ready for daily use. I hope by the end of this post, you will give Linux serious consideration.

### Flexibility

Flexibility is a boon and a curse at the same time for Linux. IMO it is the reason many people get into Linux and many people get scared of Linux. I'm in the first group though.

Flexibility and freedom is the core of Linux, you can see this theme in everything else, from the choice of distribution to choosing a DE there is a plethora of choice and even after making a choice, there are so many things you can customize to your exact preference, be it look and feel, UX or performance, everything is configurable.

![KDE plasma window customization](https://i.imgur.com/zihMQUp.jpeg)_Window decoration customization in KDE Plasma_

While such flexibility is great for power users and tech-savvy users, it could be daunting and annoying to people who just want to use the computer to get some work done. Linux in the past is known to scare off average users as they either came pretty bare metal out of the box or came with highly opinionated defaults, like unity desktop in Ubuntu. Having sane defaults was not a thing in the Linux world and that's why people associate Linux users to someone working only on a terminal as you would end up using the terminal to do something as it's the fastest way in Linux.

This situation is changing though, for example [Ubuntu](https://ubuntu.com/), with Gnome, or Kubuntu, with KDE, [Elementary](https://elementary.io/) and [Pop!\_OS](https://pop.system76.com/) are very user friendly from the beginning and comes with sane defaults and a pretty decent set of default applications. They also offer nice app stores for users to find more software.

> With great power comes great responsibility
>
> - Uncle Ben

When it comes to freedom Linux is not a walled garden like the Apple ecosystem or configurable but annoying for power users like Windows.

✅ This level of flexibility makes it easy to break things if you don't know what you are doing. But IMO the advantages outweigh the disadvantages and the default setup in Linux distros keeps getting better. It's already possible to get on a distro like Ubuntu and get work done without having to configure anything.

### UI/UX

First of all, UI and UX is not the same thing. A polished UI doesn't mean good UX and vice versa. While UI/UX is subjective for most people, they would mostly agree on what good UX is and what bad UX is. Linux didn't use to care much about either of those two decades ago and it still didn't care about UI a decade ago. Fast forward to 2020 and you will find some of the most beautiful and slick-looking UIs and one of the best UX on Linux DEs. Look at the [customized KDE plasma [video]](https://www.youtube.com/watch?v=qTF9Nmt3iXY&t=34s) on the header image of this post for example.

![KDE plasma on Garuda OS](https://i.imgur.com/ryFPwYl.png)_KDE Plasma with default Dragonized theme on Garuda OS_

The UI/UX on Linux is entirely up to the DE, which unlike in Windows/macOS is separate from the OS, and you can freely and easily switch between different DEs. You can even install multiple DEs and pick one for each login session.

Is it as polished as a macOS though? You may ask. Probably not but it makes up for that in terms of flexibility and better UX, IMO. Having used a macOS for over a year now, I do like how the UI looks but I hate the UX of a macOS. It's not very intuitive, unless you grew up with a macOS, IMO. It's either the macOS way or the highway, there isn't much flexibility in terms of what you can change to fit your preferences, and in the end, you just end up adapting to whatever the UX designers at Apple thought is good for the rest of us. I like the UX of Windows way better than that of macOS even if the UI of Windows is a bit dated.

![Gnome with Arc theme](https://i.imgur.com/E1Dbwzc.jpeg)_Gnome 3.36 with Arc theme on Fedora 32_

With Linux, you can make your UI look and feel like [macOS [video]](https://www.youtube.com/watch?v=DX_gQTQLUZc&t=101s) or [Windows [video]](https://www.youtube.com/watch?v=UZx-F-CSIaw&t=31s) if that's what you like. You can also go full [CyberPunk [video]](https://www.youtube.com/watch?v=9ToyNWl-xFk) on it if you feel like it or anything else for that matter. The possibilities are unlimited. It doesn't mean you have to customize things to get a good experience, the default setup in many of the DEs is quite good for most people.

![KDE Plasma default](https://i.imgur.com/JdMoDzb.jpg)_KDE plasma 5.20 default Breeze twilight theme on Fedora 34_

I'm using Gnome for over 4 years and recently decided I will switch to KDE when I refresh my laptop. There are a ton of DEs in the Linux world but in my personal opinion, [Gnome](https://www.gnome.org/), [KDE](https://kde.org/), [Pantheon (Elementary OS)](https://elementary.io/) and [Deepin](https://www.deepin.org/en/dde/) provides the best UX out of the box and has slick UIs as well.

✅ So I think it's fair to say Linux is better than or on par with, depending on personal preferences, macOS/Windows in terms of UI/UX

### Performance

I don't think there is much to worry about when it comes to performance. There is a reason Linux is used as the default choice for servers and infrastructure. Performance has never been an issue in the Linux world and I don't think that was ever a factor in its adoption so I'm not gonna go into details here.

Mainstream distributions based on Ubuntu, Fedora, and Arch Linux provide very good performance out of the box and DEs like Gnome and KDE have evolved to become much smoother and faster. You could even run Linux with fairly good performance on very outdated hardware thanks to lightweight distributions like [Xubuntu](https://xubuntu.org/) or [Lubuntu](https://lubuntu.net/) that use lightweight DEs like [Xfce](https://www.xfce.org/) and [LXQt](https://lxqt-project.org/)

macOS comes quite close to Linux in terms of overall performance and it still has the advantage of being built by the same company as its hardware thus making it possible to tune the OS for specific hardware without worrying about supporting other hardware combinations. Whereas in Linux & Windows, it has to work on a wide range of hardware. Also when it comes to individual application performances, some are just better tuned for macOS/Windows than for Linux

Graphics performance used to be an issue for Linux in the past but the latest drivers for both NVidia and AMD have bridged the gap a lot and you can get good GPU performance these days in Linux and even play AAA titles via Steam on Linux with performance that is on par with Windows.

Battery life on Linux laptops are still not as good as macOS or Windows but it's getting better and is not bad enough to be a deal-breaker

✅ Overall, Linux is better than Windows and macOS in overall performance. Linux also has the advantage of having more powerful hardware to choose from compared to macOS.

### Stability & software support

Unfortunately this is a weak point for Linux distros. While the Linux kernel itself is very stable, the distros on the other hand tend to be less stable compared to macOS or even Windows sometimes. While the overall stability of Linux distros has improved a lot, depending on the specific distro you are using, the stability aspect could still be an issue.

In Linux, you choose between stability and bleeding-edge based on your preference. For example;

- **Ubuntu** prioritizes stability over bleeding edge software and hence has long-interval release cycles and long-term support for versions. You won't get all software automatically updated in Ubuntu and might have to either do it manually or wait for the next release.
- **Arch Linux** on the other hand prioritizes providing the latest and greatest software over stability. It hence has a rolling release and you always get the latest software as soon as it's released. This is definitely for power users who knows what they are doing
- **Fedora** on the other hand choose a compromise to provide stable software at more frequent release cycles. So you get releases often which keeps everything up to date but versions are not supported as long as in Ubuntu.

Another issue with the Linux ecosystem is the availability & stability of software. Some software vendors just don't care about Linux users, I'm looking at you Adobe, and doesn't bother publishing software for Linux. Some publish software that is worse/unstable/buggy than their macOS/Windows counterparts. The same goes for hardware support. Linux sometimes lacks support for certain hardware that just works in Windows/macOS. While the hardware support and drivers keep getting better they will never match up with what you will find in Windows or macOS unless the vendors start caring about Linux, which will only happen if Linux gains more market share in Desktop

**Note**: If a certain Windows software is needed on Linux, there is also the possibility of getting it working with [Wine](https://appdb.winehq.org/).

Distributions like Ubuntu and Fedora are quite stable and have better support for third-party software and hardware drivers, and are getting better at staying stable. You can also find many variations of these based on your preferences. There are also many distributions in between all these, like Manjaro which is a more stable version of Arch, and so on. I have been using Fedora for close to 5 years now and I'm quite happy with its stability and shorter release cycles. If stability is very important for you, then probably Ubuntu is better for you as it has longer release cycles and a much more stable ecosystem with wider software choice.

When it comes to updates and upgrades, Linux easily wins as it's the easiest to upgrade and most updates won't even require a reboot.

✅ macOS and Windows score better in terms of stability and software/hardware support and the gap is shrinking. For daily use you already have everything required for most user personas, we will see more about these later, and with the correct distro you will not be missing out on anything.

### Security & Privacy

If you are privacy and security-focused then Linux is the best OS for you. macOS would come second but it's not even close and I think we all can agree that Windows is the worst when it comes to Security and Privacy. For Linux, you don't need to create any online accounts or use any proprietary software or send your data to anyone if you don't want to. There are also Linux distributions, like [Qubes OS](https://www.qubes-os.org/) and [PureOS](https://pureos.net/), which are entirely privacy and security-focused. Linux is also the least intrusive among the three.

On the security front, you don't have to worry about malware and junkware on Linux like in Windows. Most Linux software being open source also means they are more trustworthy and has a community around who will find and fix vulnerabilities much faster than Windows or macOS

✅ Linux is easily the best when it comes to privacy and security without sacrificing your freedom

### Installation & Availability

This probably was the hardest part of Linux in the past and it still is quite difficult in some distros like Arch, but there are many distros like Ubuntu, Fedora, Elementary and so on that are so easy to install. Most stable and popular distros provide an easy installation wizard that is easy enough for most people, but it still requires some technical knowledge and hence is not for everyone. This is where Windows takes the pie as it comes pre-installed on 95% of PCs and the same for macOS.

Thankfully this situation has started to change. When I switched to Linux in 2016, I started looking for a laptop that either came pre-installed with Linux or was certified to work well with Linux and I couldn't find many options. The only decent choice was the Dell Precision line that came with Ubuntu. Fast forward to today and there are a lot of great companies that are building PCs and laptops specifically for Linux. Even bigger names like Dell, Lenovo and Asus has started selling hardware with Linux pre-installed. Some of the good options for Linux out of the box are:

- [System76](https://system76.com/) - They make highly configurable and performant PCs and Laptops specifically for Linux that come with Pop!\_OS or Ubuntu
- [Tuxedo](https://www.tuxedocomputers.com/), [Clevo](https://laptopmetlinux.nl/) - They make highly configurable Laptops and PCs for Linux and can pre-install Ubuntu
- [Slimbook](https://slimbook.es/en/) - They make highly configurable Ultrabooks and PCs for Linux and can pre-install Ubuntu, Kubuntu, Ubuntu Mate, Debian, Elementary, Mint, Manjaro, Zorin, and KDE Neon. They even do dual boot setup with Windows.
- [Purism](https://puri.sm/) - They make PCs, Laptops, and Mobile phones that comes with PureOS, a privacy-focused Linux distro
- [Dell XPS/Precision developer editions](https://www.dell.com/en-us/work/shop/overview/cp/linuxsystems)
- [Lenovo ThinkPad](https://news.lenovo.com/pressroom/press-releases/lenovo-launches-linux-ready-thinkpad-and-thinkstation-pcs-preinstalled-with-ubuntu/)

[This list](https://linux-laptop.net/) is a good source to find if your existing hardware works for your distro of choice.

✅ The availability of pre-installed Linux laptops is still not that great and choices are very limited. But if you are Ok to do the installation yourself then there is a plethora of modern hardware to choose from and with the support of an amazing community, you can get up and running in few hours.

### Support

When it comes to support, Linux is either the best or worst depending on how you see it. For example, I would argue that Linux has the best support system due to the fact it's FOSS and there is a great community that helps you along your way. Bugs are fixed faster and security patches are available immediately when ready. No other OS has the kind of community support that Linux offers. Now if you are expecting professional paid support then probably it's not as great as what is available in Windows/macOS. While professional support is great for server distributions like RHEL very few consumer distributions, like Ubuntu, provide official support plans. Of course, many independent organizations provide support for most consumer Linux distros.

✅ This boils down to preference. For most average users community support would be good enough but if you are looking for enterprise-level support it could be a bit more work to acquire.

## Decision fatigue

Now that we looked at different aspects of the OS that we need to care about, let's look at another boon/curse in the Linux world, which in my opinion scares away regular users.

When it comes to Linux distributions they can be grouped into families based on the software packaging format they support. After that there are specific distributions and way too many derivatives of them, I'm only going to mention the popular ones here so that the blog doesn't end up being a book. You can find the full list [here](https://en.wikipedia.org/wiki/List_of_Linux_distributions)

- **RPM-based**: Fedora and derivatives, CentOS/RHEL and derivatives, openSUSE, and so on
- **Debian-based**
  - Ubuntu and derivatives like Pop!\_OS, Kubuntu, Lubuntu, Xubuntu, KDE Neon, Elementary OS, Linux Mint, and so on
  - Kali Linux, PureOS, Deepin, and so on
- **Pacman-based**: Arch Linux, Manjaro, Garuda, BlackArch and so on
- **Gentoo-based**: Gentoo other Gentoo derivatives

Distro hopping is a term popular with Linux enthusiasts, but it's not for everyone. Average users just need a working OS and having so many options will only cause decision fatigue. I'm not gonna go into the debate of, if it's good or bad to have so many distros, instead I'll make some personal suggestions for newcomers to Linux so it might help with a decision

## Linux for everyone

These are my suggestion for people who are new to Linux or for those who are annoyed with macOS/Windows but are terrified of Linux to give it a chance

### For an average computer user

For an average computer user who just wants a working desktop/laptop with which you can browse the internet, use some productivity tools, make video calls, watch videos or listen to music and do other general-purpose stuff without worrying about using the terminal for anything and have descent stability:

- [Ubuntu](https://ubuntu.com/): It's the easiest distro to get started and comes pre-installed in most Linux laptop options. It's also the most widely used Linux distro. It's easy to install and easy to use thanks to Gnome DE. It has a great community, long-term support, excellent software, and hardware support. This is the most beginner-friendly Linux distro out there that comes with a good set of default software. If you don't like Gnome or if you are coming from Windows you can choose variants like [Kubuntu](https://kubuntu.org/) or [Linux Mint](https://linuxmint.com/). If you have very old hardware then go for [Xubuntu](https://xubuntu.org/)
- [Elementary OS](https://elementary.io/): If you come from macOS, you will feel at home with elementary. It's Ubuntu-based and hence is super stable and user-friendly.

**Tip**: You can find all the officially supported laptops/desktops for Ubuntu [here](https://certification.ubuntu.com/desktop). They should work for all Ubuntu derivatives as well.

### For developers

For developers, who want a fast and productive operating system for anything from web development to kernel development the below are a great choice

- [Fedora](https://getfedora.org/): Provides a stable OS with shorter release cycles thus keeping libraries and tools up to date. Has great community and software support. Comes with required toolchain for most languages pre-installed. I have been using Fedora for over 4 years and I'm very happy with it. Fun fact, [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) also uses Fedora. It comes with Gnome DE as default and you can choose from different [variants](https://spins.fedoraproject.org/) if you like KDE or Xfce DE instead
- [Manjaro](https://manjaro.org/): If you don't mind living on the edge then Manjaro can be a good option as well, but beware that it's Arch-based and hence does rolling updates which could break something from time to time. But since it's Arch-based, it's also extremely flexible and powerful. You can find Manjaro with all popular DE options. If you are a computer science student, I would also recommend Manjaro as you can learn a lot from an Arch-based rolling distribution.

**Tip**: You can find some OOB Manjaro hardware [here](https://manjaro.org/hardware/)

### For designers and multimedia professionals

For people who are into graphics design, 3D modeling, video editing, audio production, and other media-related work, Linux could be a great choice unless your entire workflows are based on Adobe or some other software suite with poor Linux support. So first see if your favorite software suite has Linux support. If you feel a bit brave then you will be surprised with the free and OSS software alternatives like [GIMP](https://www.gimp.org/), [Kdenlive](https://kdenlive.org/), [Blender](https://www.blender.org/) and so on

- [Ubuntu Studio](https://ubuntustudio.org/): This is a great choice as Ubuntu is very stable and this variant comes with a lot of multi-media software like Gimp, Inkscape and Blender, and so on.
- [Fedora design suite](https://labs.fedoraproject.org/en/design-suite/): Another great choice if you want a bit more bleeding edge. This also comes with a lot of OSS multi-media software
- [AV Linux](http://www.bandshed.net/avlinux/): This is crafted specifically for audio production and comes with all optimizations and software required for audio/video production.

### For gamers

A decade ago you wouldn't even think of Linux when it comes to Gaming, that has changed thanks to the growing community of indie game makers and Valve, makers of Steam. Steam made it possible to run AAA titles on Linux which runs almost as well as in Windows. A great testament to this is [SteamOS](https://store.steampowered.com/steamos/) from Valve which powers their Steam Machine line of gaming PCs. There is also [Steam Play](https://www.gamingonlinux.com/articles/14552) that makes it possible to run Windows games on Linux

Windows still dominate when it comes to gaming. Largely due to huge collection of games that are only supported on Windows and due to better Graphics performance. But things are looking good on the Linux side as well and Linux might be the best alternative to Windows for gamers.

There are great options for Gamers on Linux

- [Pop!\_OS](https://pop.system76.com/): This is an Ubuntu-based distribution from System76 that comes optimized for gaming
- [SteamOS](https://store.steampowered.com/steamos/) or [GamerOS](https://gamer-os.github.io/): If you want a console-like GUI with great controller support for gaming on Steam

## Conclusion

Linux is undisputed on the mobile/server/infra space. It has the largest installed base of all general-purpose operating systems mainly due to Android. Did you know that [85% of all smartphones are powered by Linux](https://haydenjames.io/85-of-all-smartphones-are-powered-by-linux/)?

TBH, Linux has been touted as the future since the 90s, and we have been hearing "Year of the Linux Desktop" for quite some time. On the desktop space, however, it never really materialized. But from what I have observed, it finally seems like Linux is actually taking hold and getting there in the last decade. [WSL](https://docs.microsoft.com/en-us/windows/wsl/) from Microsoft is a testament to that, IMO. The fact that we are seeing more and more laptops shipping Linux OOB is also a testament to the fact that Linux on the desktop is finally happening, albeit a bit slower than we expected.

![Desktop OS shares](https://i.imgur.com/fjE6D0c.png)

I wouldn't be surprised if one day Microsoft just ditches windows and ships their own Linux distro. Well, it's probably a distant dream as Windows still holds around 75% market share in desktop OS and macOS stands around 16% with Linux and derivatives taking the remaining 9%.

---

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

Cover image credit: [Linux Scoop](https://www.youtube.com/watch?v=qTF9Nmt3iXY&t=34s)
