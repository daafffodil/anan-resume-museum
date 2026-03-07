import { createClient } from '@supabase/supabase-js'

// 这里会自动读取你在 .env.local 里填写的地址和钥匙
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 创建并导出客户端实例，这样你在页面的任何地方都能调用它
export const supabase = createClient(supabaseUrl, supabaseAnonKey)