#import <Firebase.h>

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Add this line to initialize Firebase
  [FIRApp configure];

  // Register for remote notifications
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionBadge | UNAuthorizationOptionSound)
                        completionHandler:^(BOOL granted, NSError * _Nullable error) {
      if (error) {
          NSLog(@"Error requesting authorization for notifications: %@", error);
      }
  }];
  [[UIApplication sharedApplication] registerForRemoteNotifications];

  return YES;
}

// Implement the UNUserNotificationCenterDelegate protocol
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  // Display the notification even if the app is in the foreground
  completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound);
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  // Update the device token in Firebase
  [[FIRMessaging messaging] setAPNSToken:deviceToken type:FIRMessagingAPNSTokenTypeProd];
}
