---
title: My sleek and modern Linux development machine in 2021
description: My 2021 Linux development machine explained
published: true
tags:
  - linux
  - fedora
  - development
  - kde
cover_image: 'https://i.imgur.com/LIn8i4h.jpeg'
series: Linux Environment for Developers
featured: true
canonical_url: 'https://deepu.tech/my-beautiful-linux-development-environment-2021'
devto_id: 883882
devto_url: >-
  https://dev.to/deepu105/my-sleek-and-modern-linux-development-machine-in-2021-2d8f
---

One of my most popular posts of all time was when I wrote about [my beautiful Linux development machine in 2019](https://deepu.tech/my-beautiful-linux-development-environment/). Since I got a new machine and a new setup, it naturally calls for a follow-up.

By now, I'm a die-hard Linux user. It's been five years since I'm using Linux as my primary OS. I would take a Linux machine any day over macOS or Windows. I own a Windows gaming PC and a Macbook pro from work. Still, they are nowhere near the Linux experience, personally for me. My primary driver is my Linux laptop, and I can't be any happier with it (well, I can, I'll come to that at the end of the post).

So a Dell Precision from 2016 was my primary device until last month, and it is still going good. Fedora runs smoothly on it for most parts. There is some minor glitch now and then but nothing that bothers me. What is a Linux experience without glitches, right? 😉

But that setup is almost five years old now, and sometimes it shows from the increased CPU load and fan noise. Applications like Chrome, Slack, and VSCode aren't becoming any lighter in CPU and memory usage. So when I had a chance to get a Linux machine from my new job, thank you [Okta](https://www.okta.com/), I went all in and got myself a Dell XPS 15 9510.

So here I'm detailing essential aspects of my setup and hoping it will inspire more people to use Linux. I also wrote about the [state of Linux on the desktop](https://deepu.tech/the-state-of-linux-on-desktops/). Check it out if you are interested in Linux. You might be surprised.

So when I was choosing a new laptop, I narrowed my options down to either [Dell XPS 15](https://www.dell.com/nl-nl/shop/bekijk-alle-laptops-ultrabooks-tablets/nieuw-xps-15/spd/xps-15-9510-laptop/cn95103cc) or [Tuxedo Pulse 15](https://www.tuxedocomputers.com/en/Linux-Hardware/Linux-Notebooks/15-16-inch/TUXEDO-Book-Pulse-15-Gen1.tuxedo). Form factor, CPU, and memory was the most important factors for me since my work involves working with Docker and Kubernetes, polyglot development and travel. In the end, I chose Dell since Tuxedo had some issues with multiple monitors via USB-C as it didn't have thunderbolt support.

This is not just my work laptop; it's my primary machine for all of the below.

- Java, Rust, JS, TS, Go and web development (and everything in between)
- Running multiple web applications locally
- Running Docker containers and local Kubernetes clusters
- Kubernetes, Terraform, CloudFormation development and deployments
- VirtualBox for Windows testing and other VM stuff
- Azure, AWS, and GCP deployments using required CLI tools
- Heavy browser usage
- E-mail, chat, and video conferencing
- Plex media server
- Writing, presentations, and illustrations
- YouTube and Social media

## Machine configuration

The configuration of the machine is also quite crucial for any development setup.

I selected a [custom configuration](https://www.dell.com/nl-nl/shop/bekijk-alle-laptops-ultrabooks-tablets/nieuw-xps-15/spd/xps-15-9510-laptop/cn95103cc) from Dell to get the best possible setup at that time. It's not cheap, but my company, [Okta](https://www.okta.com/), provided a handsome budget. But I do think it can be a lot more competitive in pricing like Tuxedo and the like. This, in my opinion, is one of the best Laptops for developers. So here is what I have.

![Konsole running neofetch](https://i.imgur.com/DoyiLTS.png)

- **Processor**: Intel® Core™ i9-11900H CPU @ 4.9GHz (8 cores, 16 threads)
- **Memory**: 64GB, DDR4-3200MHz SDRAM, 2 DIMMS, non-ECC
- **HDD**: 1TB M.2 NVMe SSD
- **Graphics**: NVIDIA GeForce RTX 3050Ti with 4 GB GDDR6 memory & Intel® UHD Graphics
- **Wireless**: Killer Wifi 6 (2x2) + BT 5.1
- **Keyboard**: English QWERTY US, backlit
- **Display**: 15.6" FHD 1920x1080, matte, non-touch
- **Battery**: 6-cell (86Wh)
- **Ports**: 2 x Thunderbolt 4 USB-C, 1 x USB-C 3.2 Gen2,

![Work from home setup](https://i.imgur.com/x5A39eu.jpeg)

I use the laptop mostly with my home office, which consists of a [34 inch](https://iiyama.com/gl_en/products/prolite-xub3493wqsu-b1/) and a [27 inch](https://www.msi.com/Business-Productivity-Monitor/PRO-MP271QP) monitor. A [Keychron K2](https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard?variant=31063869718617) keyboard, [Logitech MX Vertical](https://www.logitech.com/en-us/products/mice/mx-vertical-ergonomic-mouse.910-005447.html) mouse, [Razer Kiyo](https://www.razer.com/streaming-cameras/razer-kiyo-pro/RZ19-03640100-R3U1) webcam, [Elgato Keylight](https://www.elgato.com/en/key-light-air), [Fifine](https://fifinemicrophone.com/collections/microphones/products/fifine-k780-usb-microphone-kit-with-scissors-arm-stand-shock-mount-and-pop-filter) mic and a [Dell Thunderbolt dock](https://www.dell.com/nl-nl/work/shop/dell-thunderbolt-dock-wd19tbs/apd/210-azbv/pc-accessoires) that drives all my peripherals and monitors while powering the laptop all using a single USB-C cable. I have an old Sony Bluetooth headset and a cheap custom amplifier running a pair of old bookshelves and a subwoofer for audio.

## Operating system and desktop environment

Switching to Fedora was a great decision I made sometime in 2017, and I'm so happy with it. Updates are butter smooth. I don't have to worry about stuff breaking all the time from rolling releases. At the same time, new stuff lands every six months, and packages are updated frequently, keeping everything running smoothly. For a developer, that is an excellent combination, in my opinion. So naturally, I choose to stick to Fedora; why fix something that isn't broken, right?

So I'm running Fedora 34. I have been using Gnome for the past five years, but recently KDE caught my eyes, and I decided to give it a shot. So I went with the [KDE spin of Fedora](https://spins.fedoraproject.org/kde/). KDE has been great so far. I love the amount of customization you can do on it, and top of all, it looks super sleek, and there is an excellent selection of themes and styles to choose from. I'm definitely not missing Gnome.

What good is a desktop without a nice theme, right? KDE has a great collection of themes, and I went with [Ant-Dark](https://store.kde.org/p/1464321/) theme for now, and it looks gorgeous with transparency and blur effects. While KDE themes are self-sufficient with icons, cursors, and lock screens, I switched from default icons to icons from [KDE-Story theme](https://store.kde.org/p/1307867/).

![KDE Settings for appearance](https://i.imgur.com/D5wlea4.png)

I use many plugins in Gnome, but in KDE, all those came out of the box, like clipboard manager, notepad, system monitor, etc. Another reason I'm enjoying KDE.

With the new installation, I also went with the BTRFS filesystem, which is fantastic. Snapshots and backups are so fast. Though setting up snapshots and backup was a challenge initially.

## Development tools

These are mostly objective choices and really don't matter as long as you are comfortable with your chosen tools. Below are my choices for some of the important categories for development.

**Shell**: This is one of the most important for a developer. I use [ZSH](https://www.zsh.org/) along with the awesome [Starship prompt](https://starship.rs/) as my shell. I tried to switch to [Fish](https://fishshell.com/), but it was quite annoying due to its difference with bash/ZSH, and I gave up on it. I went with the default theme and settings from Starship as it was very close to my earlier setup with Oh My ZSH. I also use [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) and [zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) plugins for ZSH and [fzf](https://github.com/junegunn/fzf) for search.

**Terminal**: What good is a nice shell without a good terminal. Fortunately, the default KDE shell, Konsole, is great, and KDE also has [Yakuake](https://apps.kde.org/yakuake/), which is one of the best terminal applications out there. It has workspaces, tabs, split windows, Quake mode, etc. I mostly use Yakuake, which is bound to <kbd>Ctrl+`</kbd>

![Yakuake on KDE](https://i.imgur.com/S3cpjzW.png)

**IDE**: [Visual Studio Code](https://code.visualstudio.com/) - My go-to editor. I love it. I use VSCode for web development, Rust, Go, JS development, DevOps, and everything other than JVM languages. A VSCode setup is never complete without some good plugins. [Here](https://gist.github.com/deepu105/4599d3b381218b9d1a63119fbf9ca537) are the plugins that I'm using. You can run the script to install those. For Java development, I use [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/).

Other notable development tools I use are [GitKraken](https://www.gitkraken.com/) for Git repo management, [Beyond Compare](https://www.scootersoftware.com) for code comparisons, [VirtualBox](https://www.virtualbox.org/), [NVM](https://github.com/nvm-sh/nvm) for Node.js version management and [SDKMan](https://sdkman.io) for JDK version management.

**Toolchains**: Node.js and NPM, Rust toolchain, Golang, JVM, Deno, Ruby toolchain, and Python toolchain. I also ran `sudo dnf groupinstall "Development Tools" "Development Libraries"` to install the toolchains required for compiling Linux applications.

**DevOps**: Docker, kubectl, Terraform, k3d, and so on

## Productivity tools

Productivity tools are also quite necessary, and below are my choices.

**Browser**: Google Chrome is my primary browser. I also use Firefox sometimes. I use the [Bitwarden](https://bitwarden.com/) plugin for password management.

**E-mail**: I use [Mailspring](https://getmailspring.com/) as my e-mail client. It's a fairly decent mail client with nice themes and a simple UI.

**Office suite**: I mostly use Google Docs, but when I have to work on something on my desktop I use [LibreOffice](https://www.libreoffice.org/), which is a good office suite and even handles Microsoft Office & Keynote formats.

**Communication**: Of course I use [Slack](https://slack.com) and for video conference I use [Zoom](https://www.zoom.us/). I also have Telegram and Signal installed.

**Screen capture**: I use this nifty tool called [Peek](https://github.com/phw/peek) for screen recording and [Flameshot](https://github.com/flameshot-org/flameshot) for screenshots.

## Streaming & Media

**Streaming**: I think [OBS Studio](https://obsproject.com/) is the default choice here and is one of the best options for streaming and screen recording.

**Image editing and processing**: [Gimp](https://www.gimp.org/) for photo editing, [Inkscape](https://inkscape.org/) for vector editing, and [Draw.io](https://app.diagrams.net/) for illustrations. KDE also has some default apps for photo management, which is quite good.

**Video editing**: [Kdenlive](https://kdenlive.org/) is a great choice for video editing on Linux.

**Video player**: [SMPlayer](https://www.smplayer.info/en/downloads) is my go-to video player.

## Conclusion

There are many other small and nifty utilities that I use; most are command-line utilities. There are some notable mentions like [Timeshift](https://github.com/teejee2008/timeshift), which is nice for backing up your machine.

Of course, not everything is perfect in the Linux world, but it is the same with every OS from my experience. Before switching to Linux, I was a long-time Windows user, and last year, I spent more than a year using macOS now and then, so issues are everywhere. So like every Linux user, I have from time to time messed things up(With great power comes great responsibility, Peter). There are some minor annoyances with this new setup, but there is nothing that bothers me much. Some of the most annoying issues I have currently are below, and I'll probably fix them if it bothers me.

- New Intel platforms do not support deep sleep, and hence laptop does lose power over time, even in Idle.
- Hibernation doesn't work out of the box. It's easy to fix, but at the moment doesn't bother me.
- Some random crashes from KDE settings. Not a big deal as it's a rare occurrence.
- KDE remembers open apps on a restart, but when on multiple monitors, it doesn't remember which screen it was in.
- Biometrics is a bit tricky in Linux. The built-in fingerprint sensor doesn't have a proper driver for Fedora yet, there is one for Ubuntu, and I probably can [get it working](https://aboutcher.co.uk/2020/10/goodix-fingerprint-reader-on-fedora-linux/). For face recognition, there is [Howdy](https://github.com/boltgolt/howdy), but for some reason, I couldn't get it working and hence probably need to [do some digging](https://github.com/boltgolt/howdy/issues/604).

I hope you find this inspires you to give Linux a chance. If you have any questions, please ask in the comments.

If you like this article, please leave a like or a comment.

You can follow me on [Twitter](https://twitter.com/deepu105) and [LinkedIn](https://www.linkedin.com/in/deepu05/).

