export type Mode = LightTheme | DarkTheme

export type LightTheme = {
  tag: 'light'
  materialTheme: string
}
export type DarkTheme = {
  tag: 'dark',
  materialTheme: string
}
// instances
export const lightTheme: LightTheme = {
  tag: 'light',
  materialTheme: 'deeppurple-amber'
};
export const darkTheme: DarkTheme = {
  tag: 'dark',
  materialTheme: 'pink-bluegrey'
};
