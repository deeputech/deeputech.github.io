/// <reference types="astro/client" />

// asciinema-player ships no type declarations. Declare the subset of its API
// that AsciinemaCard.astro uses (the `create` factory + the bundled CSS).
declare module "asciinema-player" {
  export interface CreateOptions {
    cols?: number;
    rows?: number;
    autoPlay?: boolean;
    loop?: boolean;
    speed?: number;
    idleTimeLimit?: number;
    fit?: "width" | "height" | "both" | false;
    theme?: string;
    poster?: string;
    controls?: boolean | "auto";
    [key: string]: unknown;
  }
  export interface Player {
    dispose(): void;
    [key: string]: unknown;
  }
  export function create(
    src: string,
    element: HTMLElement,
    opts?: CreateOptions,
  ): Player;
}

declare module "asciinema-player/dist/bundle/asciinema-player.css";
