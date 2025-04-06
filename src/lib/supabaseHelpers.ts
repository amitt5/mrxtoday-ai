import { supabase } from "./supabaseClient";

export const saveUserToDB = async (user: any) => {
  const { id, email, user_metadata } = user;
  console.log("saveUserToDB-user", user);
  // Check if user already exists
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("user_id", id)
    // .single();

  console.log("saveUserToDB-user22", data);
  if (!data || data.length === 0) {
    console.log("saveUserToDB-user221", data);

    // Insert user
    const { error: insertError } = await supabase.from("users").insert([
      {
        user_id: id,
        email,
        full_name: user_metadata?.full_name,
        company_name: user_metadata?.company_name,
      },
    ]);

    if (insertError) {
      console.error("Error inserting user:", insertError.message);
    }
  }
};

export const saveUserRoleToDB = async (user: any) => {
  const { id } = user;

  // Check if user already exists
  const { data, error } = await supabase
    .from("user_roles")
    .select("id")
    .eq("user_id", id)
    // .single();

  if (!data || data.length === 0) {
    // Insert user
    const { error: insertError } = await supabase.from("user_roles").insert([
      {
        user_id: id,
        role: "user",
      },
    ]);

    if (insertError) {
      console.error("Error inserting user:", insertError.message);
    }
  }
};
