import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signUpUser(email: string, password: string, fullName: string, companyName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        company_name: companyName,
      },
    },
  });

   // Check if there's an error during the sign-up process
   if (error) {
    console.error("Error during sign-up:", error.message);
    return { success: false, message: error.message };
    }

    // Step 2: If sign-up is successful, manually insert user data into the 'users' table
    // const { data: any, error: insertError } = await supabase
    // .from('users')
    // .insert([
    //     {
    //         id: data?.user?.id,          // Use the user ID from the auth system
    //         email: data?.user?.email,    // Use the email from the user data
    //         full_name: fullName,  // Use the full name provided
    //         company_name: companyName,
    //     }
    // ]);

    // // Check if there was an error while inserting user data into the 'users' table
    // if (insertError) {
    //     console.error("Error inserting user into the database:", insertError.message);
    //     return { success: false, message: insertError.message };
    // } else {
    //     console.log("User inserted into the database:", data);
    //     return { success: true, message: "User inserted into the database" };
    // }

  return { data, error };
}

export async function signInUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  return { error };
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();

  return user;
}

// export async function getUserProfile(userId: string) {
//   const { data, error } = await supabase
//     .from('profiles')
//     .select('*')
//     .eq('id', userId)
//     .single();

//   return { data, error };
// }

// export async function updateUserProfile(userId: string, data1: any) {
//   const { data, error } = await supabase
//     .from('profiles')
//     .update(data1)
//     .eq('id', userId)
//     .select('*')
//     .single();

//   return { data, error };
// }
