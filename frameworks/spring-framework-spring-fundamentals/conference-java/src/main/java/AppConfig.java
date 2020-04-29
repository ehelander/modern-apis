import com.pluralsight.service.SpeakerService;
import com.pluralsight.service.SpeakerServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// Signifies this file is to be used for configuration purposes.
@Configuration
public class AppConfig {

    // Create a bean. The name is optional; camelCase by convention.
    @Bean(name = "speakerService")
    public SpeakerService getSpeakerService() {
         return new SpeakerServiceImpl();

    }
}
