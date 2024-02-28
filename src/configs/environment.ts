/**
 * @file App environment
 * @module app.environment
 * @author Tinh
 */

// runtime env
export const isDev = import.meta.env.VITE_MODE === 'dev'
export const isTest = import.meta.env.VITE_MODE === 'test'
export const isStag = import.meta.env.VITE_MODE === 'stag'
export const isProd = import.meta.env.VITE_MODE === 'prod'
