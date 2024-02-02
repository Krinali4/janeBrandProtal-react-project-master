export default class JsonUtils {
  
  public static getUndValue(element: any): string | null {
    if (element && 
      element.und &&
      Array.isArray(element.und) && 
      element.und.length > 0 &&
      element.und[0].value
      ) {
      return element.und[0].value
    }
    return null
  }

  public static getUndTargetId(element: any): string | null {
    if (element && 
      element.und &&
      Array.isArray(element.und) && 
      element.und.length > 0 &&
      element.und[0].target_id
      ) {
      return element.und[0].target_id
    }
    return null
  }

  public static getUndIso2(element: any): string | null {
    if (element && 
      element.und &&
      Array.isArray(element.und) && 
      element.und.length > 0 &&
      element.und[0].iso2
      ) {
      return element.und[0].iso2
    }
    return null
  }

  public static getUndProfilePicUrlValue(undJsonElement: any): string | null {
    if (undJsonElement && !Array.isArray(undJsonElement)) {
      if (undJsonElement.und![0].fid && undJsonElement.und![0].full_url) {
        return undJsonElement.und![0].full_url
      }
    }
    return null
  }

  private constructor() {}
}
