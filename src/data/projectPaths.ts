// Known shared app roots and newly introduced project names are reserved.
// New overview pages must not write into a possible app document root.
export const SHARED_APP_ROOTS = ['clinicalproms', 'audioquill', 'podium', 'literature-decoded', 'thestreetsignal'] as const

export function projectPath(slug: string): string {
  return SHARED_APP_ROOTS.some(root => root === slug) ? `/projects/${slug}` : `/${slug}`
}
