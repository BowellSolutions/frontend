import {AxiosResponse} from "axios";

export type Response<T> = AxiosResponse<T>;

export interface UserData {
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  last_login: Date,
  is_active: boolean,
  is_staff: boolean,
  is_superuser: boolean,
  date_joined: Date,
  groups: any[],
  user_permissions: any[],
}

export interface FileData {
  id: number,
  file: string,
  name: string,
  uploaded_at: Date,
  latest_analysis_date?: Date,
  // examination
  examination: ExaminationData | null,
  // main results
  length?: number,
  bowell_sounds_number?: number,
  bowell_sounds_per_minute?: number,
  // frequency analysis in three-minute periods
  mean_per_minute?: number,
  deviation_per_minute?: number,
  median_per_minute?: number,
  first_quartile_per_minute?: number,
  third_quartile_per_minute?: number,
  first_decile_per_minute?: number,
  ninth_decile_per_minute?: number,
  minimum_per_minute?: number,
  maximum_per_minute?: number,
  repetition_within_50ms?: number,
  repetition_within_100ms?: number,
  repetition_within_200ms?: number,
  containing_30s_periods_percentage?: number,
  // Duration analysis, individual bowel sounds
  mean?: number,
  deviation?: number,
  median?: number,
  first_quartile?: number,
  third_quartile?: number,
  first_decile?: number,
  ninth_decile?: number,
  minimum?: number,
  maximum?: number,
  rmssd?: number,
  rmssd_logarithm?: number,
  sdnn?: number,
  porta_index?: number,
  guzik_index?: number,
  high_frequency_power?: number,
  medium_frequency_power?: number,
  low_frequency_power?: number,
  // Sound analysis total?: number,
  total_sound_index?: number,
  total_sound_duration?: number,
  // sound analysis per three minute periods?: number,
  total_sound_index_per_3minutes?: number,
  total_sound_duration_per_3minutes?: number,
  // technical details
  similarity_to_training_set?: number,
}

export interface UserInfo {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
}

export interface RecordingInExamination {
  id: number,
  file: string,
  name: string,
}

export interface ExaminationData {
  id: number,
  patient: UserInfo,
  doctor: UserInfo,
  height_cm?: number,
  mass_kg?: number,
  symptoms?: string,
  medication?: string,
  status?: string,
  recording: RecordingInExamination | null,
  date: Date | string,
  overview?: string,
}
