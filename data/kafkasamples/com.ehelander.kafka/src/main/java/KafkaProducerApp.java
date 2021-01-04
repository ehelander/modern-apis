import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

import java.util.Properties;
import java.util.stream.IntStream;

public class KafkaProducerApp {
    public static void main(String[] args) {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092,localhost:9093");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        // Important: Close resource to avoid memory leak.
        try (KafkaProducer<String, String> producer = new KafkaProducer<>(props)) {
            String topic = "my-topic";
            String value = "MyMessage: %i";
            IntStream.range(0, 150).forEachOrdered(i -> {
                ProducerRecord<String, String> record = new ProducerRecord<>(topic, Integer.toString(i), String.format(value, i));
                producer.send(record);
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
